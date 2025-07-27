#!/bin/bash

set -euo pipefail

APP_DIR="/home/aric/htdocs/aric.md"
BACKUP_DIR="/home/aric/backups/aric.md"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "➡️ Navigare în directorul aplicației: $APP_DIR"
cd "$APP_DIR"

# Check Node.js version
echo "🔍 Verificare versiune Node.js"
NODE_VERSION=$(node --version)
echo "📋 Node.js version detectată: $NODE_VERSION"

# Extract major version number
NODE_MAJOR=$(echo $NODE_VERSION | sed 's/v\([0-9]*\).*/\1/')
echo "📊 Node.js major version: $NODE_MAJOR"

if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "❌ Error: Node.js $NODE_VERSION este prea vechi!"
  echo "🔧 Aplicația necesită Node.js >=18.0.0"
  echo "💡 Te rog să actualizezi Node.js pe server la versiunea 18, 20 sau 22"
  echo ""
  echo "🚀 Comenzi pentru actualizare Node.js:"
  echo "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
  echo "sudo apt-get install -y nodejs"
  echo ""
  echo "sau folosește nvm:"
  echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
  echo "nvm install 20"
  echo "nvm use 20"
  exit 1
fi

echo "✅ Node.js version este compatibilă"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "💾 Creează backup înainte de deploy"
if [ -d ".next" ]; then
  cp -r .next "$BACKUP_DIR/.next_$TIMESTAMP" 2>/dev/null || echo "⚠️ Warning: Nu s-a putut crea backup pentru .next existent"
fi

echo "🔍 Verificare completă a fișierelor transferate"
echo "📂 Conținutul directorului curent:"
ls -la

echo "🔍 Verificare BUILD_VERIFICATION:"
if [ -f "BUILD_VERIFICATION" ]; then
  echo "✅ Build verification găsit:"
  cat BUILD_VERIFICATION
else
  echo "⚠️ Build verification lipsește"
fi

echo "🔍 Verificare dacă folderul .next există"
if [ ! -d ".next" ]; then
  echo "❌ Error: .next folder nu există! Build-ul nu s-a transferat corect."
  echo "📂 Toate fișierele disponibile:"
  find . -name "*" -type f | head -20
  echo "📂 Toate directoarele disponibile:"
  find . -name "*" -type d | head -10
  echo "📋 Căutare după anything cu 'next':"
  find . -name "*next*" | head -10
  exit 1
fi

echo "✅ .next folder găsit cu dimensiunea: $(du -sh .next | cut -f1)"
echo "📊 Numărul de fișiere în .next: $(find .next -type f | wc -l)"

echo "➡️ Instalare dependențe runtime (production only)"
npm ci --omit=dev --prefer-offline --no-audit

echo "➡️ Verificare dacă pm2 este instalat"
if ! command -v pm2 &> /dev/null; then
  echo "⚠️ pm2 nu este instalat. Instalează-l global cu: npm i -g pm2"
  exit 1
fi

echo "➡️ Pornire/restart aplicație cu pm2"
if pm2 describe aric-md > /dev/null 2>&1; then
  echo "🔄 Aplicația este deja pornită, restart pm2"
  pm2 restart aric-md --update-env
else
  echo "🚀 Aplicația nu rulează încă, pornire pm2"
  pm2 start npm --name aric-md -- start
fi

echo "📊 Status pm2:"
pm2 list

# Health check
echo "🏥 Verificare health check"
sleep 5
if curl -f -s http://localhost:3000 > /dev/null; then
  echo "✅ Aplicația răspunde corect"
  # Clean old backups (keep last 5)
  find "$BACKUP_DIR" -name ".next_*" -type d | sort -r | tail -n +6 | xargs rm -rf 2>/dev/null || true
  echo "✅ Deploy finalizat cu succes!"
else
  echo "❌ Aplicația nu răspunde! Încercare rollback..."
  
  # Find latest backup
  LATEST_BACKUP=$(find "$BACKUP_DIR" -name ".next_*" -type d | sort -r | head -n 1)
  
  if [ -n "$LATEST_BACKUP" ] && [ -d "$LATEST_BACKUP" ]; then
    echo "🔄 Restaurare din backup: $LATEST_BACKUP"
    rm -rf .next
    cp -r "$LATEST_BACKUP" .next
    
    # Restart pm2
    if pm2 describe aric-md > /dev/null 2>&1; then
      pm2 restart aric-md --update-env
    fi
    
    # Check again
    sleep 5
    if curl -f -s http://localhost:3000 > /dev/null; then
      echo "✅ Rollback successful"
    else
      echo "❌ Rollback failed - manual intervention needed"
      exit 1
    fi
  else
    echo "❌ Nu există backup pentru rollback - manual intervention needed"
    exit 1
  fi
fi