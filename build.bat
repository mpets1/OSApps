@echo off
REM OSApps Build Script for Windows
REM This script automates the process of building the OSApps installer

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   OSApps Build Script
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo Building React application...
call npm run react-build
if errorlevel 1 (
    echo ERROR: React build failed
    pause
    exit /b 1
)

echo.
echo Building Electron application with Electron Builder...
echo.
echo Select build target:
echo   1. Both (NSIS installer + Portable)
echo   2. NSIS Installer only
echo   3. Portable executable only
echo   4. Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo Building NSIS + Portable...
    call npx electron-builder --win
) else if "%choice%"=="2" (
    echo Building NSIS Installer...
    call npx electron-builder --win nsis
) else if "%choice%"=="3" (
    echo Building Portable Executable...
    call npx electron-builder --win portable
) else if "%choice%"=="4" (
    echo Cancelled.
    exit /b 0
) else (
    echo Invalid choice. Exiting.
    exit /b 1
)

if errorlevel 1 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Build Complete!
echo ========================================
echo.
echo Build artifacts are located in: dist/
echo.
dir dist /B
echo.
echo You can now:
echo   1. Test the installers locally
echo   2. Upload to GitHub Releases
echo   3. Share with users
echo.
pause
