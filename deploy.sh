#!/bin/bash

set -euo pipefail

# Configuration
APP_DIR="/home/aric/htdocs/aric.md"
BACKUP_DIR="/home/aric/backups/aric.md"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
APP_NAME="aric-md"
APP_PORT="3000"

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

# Error handling
cleanup() {
    if [ $? -ne 0 ]; then
        log_error "Deploy failed! Check logs above for details."
        exit 1
    fi
}
trap cleanup EXIT

# Main deployment function
main() {
    log_info "🚀 Starting deployment for $APP_NAME"
    
    # Navigate to app directory
    log_info "Navigating to: $APP_DIR"
    cd "$APP_DIR"
    
    # Check Node.js compatibility
    check_nodejs_version
    
    # Create backup
    create_backup
    
    # Verify deployment files
    verify_deployment_files
    
    # Install dependencies
    install_dependencies
    
    # Fix permissions
    fix_permissions
    
    # Deploy application
    deploy_application
    
    # Health check and cleanup
    health_check_and_cleanup
    
    log_success "🎉 Deployment completed successfully!"
}

check_nodejs_version() {
    log_info "Checking Node.js version"
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed!"
        exit 1
    fi
    
    local node_version=$(node --version)
    local node_major="${node_version#v}"
    node_major="${node_major%%.*}"
    
    log_info "Detected Node.js version: $node_version"
    
    if [ "$node_major" -lt 18 ]; then
        log_error "Node.js $node_version is too old! Required: >=18.0.0"
        echo
        echo "📋 Update commands:"
        echo "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
        echo "sudo apt-get install -y nodejs"
        exit 1
    fi
    
    log_success "Node.js version is compatible"
}

create_backup() {
    log_info "Creating backup"
    mkdir -p "$BACKUP_DIR"
    
    if [ -d ".next" ]; then
        if cp -r .next "$BACKUP_DIR/.next_$TIMESTAMP" 2>/dev/null; then
            log_success "Backup created: .next_$TIMESTAMP"
        else
            log_warning "Could not create backup"
        fi
    fi
}

verify_deployment_files() {
    log_info "Verifying deployment files"
    
    # Check BUILD_VERIFICATION
    if [ -f "BUILD_VERIFICATION" ]; then
        log_success "Build verification found:"
        cat BUILD_VERIFICATION | sed 's/^/  /'
    else
        log_warning "Build verification missing"
    fi
    
    # Check .next folder
    if [ ! -d ".next" ]; then
        log_error ".next folder missing! Deployment files not transferred correctly."
        echo
        echo "📂 Available files:"
        find . -maxdepth 2 -type f | head -10
        echo "📁 Available directories:"
        find . -maxdepth 2 -type d | head -10
        exit 1
    fi
    
    local next_size=$(du -sh .next | cut -f1)
    local next_files=$(find .next -type f | wc -l)
    log_success ".next folder found: $next_size ($next_files files)"
}

install_dependencies() {
    log_info "Installing production dependencies"
    
    if npm ci --omit=dev --prefer-offline --no-audit --silent; then
        log_success "Dependencies installed successfully"
    else
        log_error "Failed to install dependencies"
        exit 1
    fi
}

fix_permissions() {
    log_info "Fixing permissions"
    
    # Fix node_modules/.bin permissions
    if [ -d "node_modules/.bin" ]; then
        chmod +x node_modules/.bin/* 2>/dev/null || log_warning "Could not fix all binary permissions"
        chmod +x node_modules/.bin/next 2>/dev/null || log_warning "Could not fix next binary permissions"
        
        # Verify next binary
        if ./node_modules/.bin/next --version &>/dev/null; then
            log_success "Next.js binary is working"
        else
            log_error "Next.js binary has issues"
            ls -la node_modules/.bin/next
            exit 1
        fi
    fi
}

deploy_application() {
    log_info "Deploying application with PM2"
    
    # Check if PM2 is installed
    if ! command -v pm2 &> /dev/null; then
        log_error "PM2 is not installed! Install with: npm i -g pm2"
        exit 1
    fi
    
    # Find npm path for PM2
    local npm_path=$(which npm)
    if [ -z "$npm_path" ]; then
        log_error "npm not found in PATH"
        exit 1
    fi
    
    # Deploy with PM2
    if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
        log_info "Application exists, restarting..."
        pm2 restart "$APP_NAME" --update-env
    else
        log_info "Starting new application..."
        pm2 start "$npm_path" --name "$APP_NAME" -- start
    fi
    
    # Wait for PM2 to stabilize
    sleep 3
    
    # Show PM2 status
    echo
    pm2 list | grep -E "(App name|$APP_NAME|──)" || pm2 list
}

health_check_and_cleanup() {
    log_info "Performing health check"
    
    # Wait for application to start
    sleep 5
    
    if curl -f -s "http://localhost:$APP_PORT" > /dev/null; then
        log_success "Application is responding correctly"
        
        # Clean old backups (keep last 5)
        if [ -d "$BACKUP_DIR" ]; then
            find "$BACKUP_DIR" -name ".next_*" -type d | sort -r | tail -n +6 | xargs rm -rf 2>/dev/null || true
            log_info "Cleaned old backups"
        fi
        
    else
        log_error "Application is not responding! Attempting rollback..."
        attempt_rollback
    fi
}

attempt_rollback() {
    log_info "🔄 Starting rollback procedure"
    
    # Find latest backup
    local latest_backup=$(find "$BACKUP_DIR" -name ".next_*" -type d | sort -r | head -n 1)
    
    if [ -n "$latest_backup" ] && [ -d "$latest_backup" ]; then
        log_info "Restoring from backup: $(basename "$latest_backup")"
        
        rm -rf .next
        cp -r "$latest_backup" .next
        
        # Restart PM2
        if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
            pm2 restart "$APP_NAME" --update-env
        fi
        
        # Check if rollback worked
        sleep 5
        if curl -f -s "http://localhost:$APP_PORT" > /dev/null; then
            log_success "Rollback successful!"
        else
            log_error "Rollback failed - manual intervention required"
            exit 1
        fi
    else
        log_error "No backup available for rollback - manual intervention required"
        exit 1
    fi
}

# Run main function
main "$@"