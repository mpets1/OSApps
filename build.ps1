#!/usr/bin/env pwsh
# OSApps Build Script for Windows (PowerShell)
# This script automates the process of building the OSApps installer

param(
    [ValidateSet('all', 'nsis', 'portable', 'help')]
    [string]$Target = 'all'
)

function Write-Header {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "   OSApps Build Script" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Success {
    Write-Host $args -ForegroundColor Green
}

function Write-Error {
    Write-Host $args -ForegroundColor Red
}

function Check-NodeInstalled {
    try {
        $null = node --version
        Write-Success "✓ Node.js detected"
        return $true
    }
    catch {
        Write-Error "✗ Node.js is not installed or not in PATH"
        Write-Host "Please install Node.js from https://nodejs.org/"
        return $false
    }
}

function Install-Dependencies {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    & npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "✗ npm install failed"
        return $false
    }
    Write-Success "✓ Dependencies installed"
    return $true
}

function Build-React {
    Write-Host "Building React application..." -ForegroundColor Yellow
    & npm run react-build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "✗ React build failed"
        return $false
    }
    Write-Success "✓ React app built"
    return $true
}

function Build-Electron {
    param([string]$Target)
    
    Write-Host "Building Electron application with Electron Builder..." -ForegroundColor Yellow
    Write-Host ""
    
    switch ($Target) {
        'all' {
            Write-Host "Building NSIS + Portable..." -ForegroundColor Cyan
            & npx electron-builder --win
        }
        'nsis' {
            Write-Host "Building NSIS Installer..." -ForegroundColor Cyan
            & npx electron-builder --win nsis
        }
        'portable' {
            Write-Host "Building Portable Executable..." -ForegroundColor Cyan
            & npx electron-builder --win portable
        }
        'help' {
            Write-Host "Build targets:"
            Write-Host "  all      - Both NSIS installer and portable (default)"
            Write-Host "  nsis     - NSIS installer only"
            Write-Host "  portable - Portable executable only"
            Write-Host ""
            Write-Host "Usage: .\build.ps1 -Target <target>"
            return $true
        }
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error "✗ Build failed"
        return $false
    }
    Write-Success "✓ Electron app built"
    return $true
}

function Show-Results {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   Build Complete!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Build artifacts are located in: dist/" -ForegroundColor Cyan
    Write-Host ""
    Get-ChildItem -Path "dist" -Name
    Write-Host ""
    Write-Host "You can now:"
    Write-Host "  1. Test the installers locally"
    Write-Host "  2. Upload to GitHub Releases"
    Write-Host "  3. Share with users"
    Write-Host ""
}

# Main execution
Write-Header

if ($Target -eq 'help') {
    Build-Electron -Target 'help'
    exit 0
}

if (-not (Check-NodeInstalled)) {
    exit 1
}

if (-not (Install-Dependencies)) {
    exit 1
}

if (-not (Build-React)) {
    exit 1
}

if (-not (Build-Electron -Target $Target)) {
    exit 1
}

Show-Results
