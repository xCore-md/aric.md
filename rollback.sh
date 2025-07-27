#!/bin/bash

set -euo pipefail

APP_DIR="/home/aric/htdocs/aric.md"
BACKUP_DIR="/home/aric/backups/aric.md"

echo "🔄 Manual Rollback Script pentru aric.md"
echo "========================================"

cd "$APP_DIR"

# List available backups
echo "📋 Backup-uri disponibile:"
BACKUPS=($(find "$BACKUP_DIR" -name ".next_*" -type d | sort -r))

if [ ${#BACKUPS[@]} -eq 0 ]; then
  echo "❌ Nu există backup-uri disponibile!"
  exit 1
fi

# Show backups with numbers
for i in "${!BACKUPS[@]}"; do
  BACKUP_NAME=$(basename "${BACKUPS[$i]}")
  BACKUP_DATE=$(echo "$BACKUP_NAME" | sed 's/.next_//' | sed 's/_/ /')
  echo "$((i+1)). $BACKUP_NAME (Data: $BACKUP_DATE)"
done

# Get user choice
echo ""
read -p "Alege numărul backup-ului pentru rollback (1-${#BACKUPS[@]}): " CHOICE

# Validate choice
if [[ ! "$CHOICE" =~ ^[0-9]+$ ]] || [ "$CHOICE" -lt 1 ] || [ "$CHOICE" -gt ${#BACKUPS[@]} ]; then
  echo "❌ Alegere invalidă!"
  exit 1
fi

SELECTED_BACKUP="${BACKUPS[$((CHOICE-1))]}"
echo "📦 Backup selectat: $(basename "$SELECTED_BACKUP")"

# Confirm
read -p "Confirmi rollback-ul? (y/N): " CONFIRM
if [[ ! "$CONFIRM" =~ ^[Yy]$ ]]; then
  echo "❌ Rollback anulat"
  exit 0
fi

# Perform rollback
echo "🔄 Începe rollback..."

# Create backup of current state
CURRENT_TIMESTAMP=$(date +%Y%m%d_%H%M%S)
if [ -d ".next" ]; then
  echo "💾 Backup current state..."
  cp -r .next "$BACKUP_DIR/.next_before_rollback_$CURRENT_TIMESTAMP"
fi

# Restore from backup
echo "📥 Restaurare din backup..."
rm -rf .next
cp -r "$SELECTED_BACKUP" .next

# Restart pm2
echo "🔄 Restart PM2..."
if pm2 describe aric-md > /dev/null 2>&1; then
  pm2 restart aric-md --update-env
else
  echo "🚀 Start PM2..."
  pm2 start npm --name aric-md -- start
fi

# Health check
echo "🏥 Health check..."
sleep 5
if curl -f -s http://localhost:3000 > /dev/null; then
  echo "✅ Rollback successful! Aplicația funcționează."
  echo "📊 PM2 status:"
  pm2 list
else
  echo "❌ Rollback failed - aplicația nu răspunde"
  exit 1
fi