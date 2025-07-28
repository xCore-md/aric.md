#!/bin/bash

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

echo "🔧 Environment Variables Setup for aric.md"
echo "==========================================="

# Navigate to app directory
APP_DIR="/home/aric/htdocs/aric.md"
cd "$APP_DIR" || { log_error "Cannot access $APP_DIR"; exit 1; }

# Check if .env exists
if [ -f ".env" ]; then
    log_info "Found existing .env file"
    echo
    echo "Current .env contents:"
    while IFS= read -r line; do
        if [[ $line == *"SECRET"* ]] || [[ $line == *"KEY"* ]] || [[ $line == *"PASSWORD"* ]]; then
            key=$(echo "$line" | cut -d'=' -f1)
            echo "  $key=***hidden***"
        else
            echo "  $line"
        fi
    done < .env
    echo
    
    read -p "Do you want to edit the existing .env file? (y/N): " EDIT_EXISTING
    if [[ ! "$EDIT_EXISTING" =~ ^[Yy]$ ]]; then
        log_info "Keeping existing .env file unchanged"
        exit 0
    fi
else
    log_info "No .env file found, creating new one..."
fi

# Interactive .env setup
echo
log_info "Setting up environment variables interactively..."

# API URL
current_api_url=$(grep "^NEXT_PUBLIC_API_URL=" .env 2>/dev/null | cut -d'=' -f2 || echo "https://aric-api-main-n0rc65.laravel.cloud/api/")
echo
echo "📡 API Configuration:"
read -p "API URL [$current_api_url]: " NEW_API_URL
API_URL=${NEW_API_URL:-$current_api_url}

# Auth Secret
current_auth_secret=$(grep "^AUTH_SECRET=" .env 2>/dev/null | cut -d'=' -f2 || echo "")
echo
echo "🔐 Authentication:"
if [ -z "$current_auth_secret" ] || [ "$current_auth_secret" = "your-secret-key-change-this-in-production" ]; then
    log_warning "No secure AUTH_SECRET found!"
    echo "Generating a secure random secret..."
    NEW_AUTH_SECRET=$(openssl rand -base64 32 2>/dev/null || date +%s | sha256sum | base64 | head -c 32)
    echo "Generated: ${NEW_AUTH_SECRET:0:20}..."
    read -p "Use generated secret? (Y/n): " USE_GENERATED
    if [[ "$USE_GENERATED" =~ ^[Nn]$ ]]; then
        read -p "Enter your own AUTH_SECRET: " NEW_AUTH_SECRET
    fi
else
    echo "Current AUTH_SECRET: ${current_auth_secret:0:20}..."
    read -p "Keep current secret? (Y/n): " KEEP_SECRET
    if [[ "$KEEP_SECRET" =~ ^[Nn]$ ]]; then
        read -p "Enter new AUTH_SECRET: " NEW_AUTH_SECRET
    else
        NEW_AUTH_SECRET="$current_auth_secret"
    fi
fi

# NextAuth URL
current_nextauth_url=$(grep "^NEXTAUTH_URL=" .env 2>/dev/null | cut -d'=' -f2 || echo "https://aric.md")
echo
echo "🌐 NextAuth URL:"
read -p "NextAuth URL [$current_nextauth_url]: " NEW_NEXTAUTH_URL
NEXTAUTH_URL=${NEW_NEXTAUTH_URL:-$current_nextauth_url}

# Node Environment
current_node_env=$(grep "^NODE_ENV=" .env 2>/dev/null | cut -d'=' -f2 || echo "production")
echo
echo "⚙️ Environment:"
read -p "Node Environment [$current_node_env]: " NEW_NODE_ENV
NODE_ENV=${NEW_NODE_ENV:-$current_node_env}

# Create backup if file exists
if [ -f ".env" ]; then
    cp .env ".env.backup.$(date +%Y%m%d_%H%M%S)"
    log_info "Created backup of existing .env file"
fi

# Write new .env file
log_info "Creating new .env file..."

cat > .env << EOF
# Production Environment Configuration
NODE_ENV=$NODE_ENV

# API Configuration
NEXT_PUBLIC_API_URL=$API_URL

# Authentication
AUTH_SECRET=$NEW_AUTH_SECRET

# Next.js Configuration
NEXTAUTH_URL=$NEXTAUTH_URL

# Add other environment variables as needed
# DATABASE_URL=
# REDIS_URL=
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASS=
EOF

# Set secure permissions
chmod 600 .env
chown $(whoami):$(whoami) .env 2>/dev/null || true

log_success ".env file created successfully!"
echo
log_info "File permissions set to 600 (owner read/write only)"
log_info "Location: $APP_DIR/.env"

echo
log_success "✅ Environment setup complete!"
echo
echo "📋 Next steps:"
echo "1. Review the .env file: cat .env"
echo "2. Add any additional environment variables you need"
echo "3. Run deployment: ./deploy.sh"

echo
log_warning "⚠️  Security reminder:"
echo "   - Never commit .env to version control"
echo "   - Keep your AUTH_SECRET secure"
echo "   - Use HTTPS in production URLs"