#!/bin/bash

set -euo pipefail

echo "🚀 Script pentru actualizare Node.js pe server"
echo "=============================================="

# Check current version
echo "📋 Versiunea curentă Node.js:"
node --version || echo "Node.js nu este instalat"

echo ""
echo "🔧 Opțiuni pentru actualizare:"
echo "1. Folosește NodeSource repository (recomandat)"
echo "2. Folosește NVM (Node Version Manager)"
echo "3. Verifică doar versiunea"

read -p "Alege opțiunea (1-3): " CHOICE

case $CHOICE in
  1)
    echo "📦 Instalare Node.js 20 via NodeSource..."
    
    # Remove existing nodejs if installed via apt
    sudo apt-get remove -y nodejs npm || true
    
    # Add NodeSource repository
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    
    # Install Node.js
    sudo apt-get install -y nodejs
    
    echo "✅ Node.js instalat!"
    node --version
    npm --version
    ;;
    
  2)
    echo "📦 Instalare Node.js via NVM..."
    
    # Install NVM if not present
    if ! command -v nvm &> /dev/null; then
      echo "📥 Instalare NVM..."
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
      export NVM_DIR="$HOME/.nvm"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    fi
    
    # Install and use Node.js 20
    nvm install 20
    nvm use 20
    nvm alias default 20
    
    echo "✅ Node.js instalat via NVM!"
    node --version
    npm --version
    
    echo "💡 Pentru a folosi această versiune permanent, adaugă în ~/.bashrc:"
    echo 'export NVM_DIR="$HOME/.nvm"'
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'
    echo "nvm use 20"
    ;;
    
  3)
    echo "📊 Verificare versiune curentă:"
    node --version
    npm --version
    
    NODE_MAJOR=$(node --version | sed 's/v\([0-9]*\).*/\1/')
    if [ "$NODE_MAJOR" -lt 18 ]; then
      echo "❌ Versiunea este prea veche pentru Next.js 15!"
      echo "🔧 Necesită Node.js >=18.0.0"
    else
      echo "✅ Versiunea este compatibilă"
    fi
    ;;
    
  *)
    echo "❌ Opțiune invalidă!"
    exit 1
    ;;
esac

echo ""
echo "🏁 Script finalizat!"