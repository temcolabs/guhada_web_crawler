@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

REM Check if npm is installed
where npm >nul 2>&1
if errorlevel 1 (
    echo "npm command not found. Please ensure Node.js is installed."
    pause
    exit /b 1
)

REM Fetch the latest code
call :GetLatestCode

REM Install dependencies
@REM call :InstallDependencies

REM Check and build Next.js
call :CheckAndBuild

REM Start Next.js server
call :StartServer

pause
exit /b


REM ===============================
REM Fetch the latest code
REM ===============================
:GetLatestCode
echo "Fetching the latest code from Git..."
call npm run getLastVersionWindow
exit /b

REM ===============================
REM Install npm dependencies
REM ===============================
:InstallDependencies
echo "Installing dependencies..."
call npm install -f
exit /b

REM ===============================
REM Check and build Next.js
REM ===============================

:CheckAndBuild
set "NEXT_DIR=%CD%\.next"
set "NEXT_VERSION_FILE=%NEXT_DIR%\version.txt"

REM Get package.json version using PowerShell (trimmed)
for /f "delims=" %%a in ('powershell -command "(Get-Content package.json -Raw | ConvertFrom-Json).version.Trim()"') do set "PACKAGE_VERSION=%%a"

REM Check if .next folder exists
if not exist "%NEXT_DIR%" (
    echo ".next folder does not exist. Running build..."
    call npm run build
    echo %PACKAGE_VERSION% > "%NEXT_VERSION_FILE%"
    exit /b
)

REM Check if version.txt exists
if not exist "%NEXT_VERSION_FILE%" (
    echo "No version file found in .next folder. Running build..."
    call npm run build
    echo %PACKAGE_VERSION% > "%NEXT_VERSION_FILE%"
    exit /b
)

REM Read stored version from version.txt and trim spaces
set /p STORED_VERSION=<"%NEXT_VERSION_FILE%"
for /f "delims=" %%b in ("%STORED_VERSION%") do set "STORED_VERSION=%%b"

echo "%STORED_VERSION% %PACKAGE_VERSION%"
REM Compare stored version with package.json version
if "%STORED_VERSION%" neq "%PACKAGE_VERSION%" (
    echo "Version mismatch detected: .next (%STORED_VERSION%) vs package.json (%PACKAGE_VERSION%). Running build..."
    call npm run build
    echo %PACKAGE_VERSION% > "%NEXT_VERSION_FILE%"
) else (
    echo "Version matches. Skipping build."
)

exit /b



REM ===============================
REM Start Next.js server
REM ===============================
:StartServer
echo "Starting Next.js server..."
call npm run start
exit /b
