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
call :InstallDependencies

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
set "NEXT_DIR=.next"
set "NEXT_VERSION=%NEXT_DIR%\version.txt"


REM Get version from package.json using PowerShell and trim()
for /f "delims=" %%a in ('powershell -command "(Get-Content package.json -Raw | ConvertFrom-Json).version.Trim()"') do set "PACKAGE_VERSION=%%a"




echo "패키지 버전 : %PACKAGE_VERSION% > 빌드폴더 버전 : %NEXT_VERSION%"

REM Check if .next folder exists, if not, run build
if not exist "%NEXT_DIR%" (
    echo ".next folder does not exist. Running build..."
    call npm run build
    echo %PACKAGE_VERSION% > "%NEXT_VERSION%"
    exit /b
)


REM Read stored version from version.txt


REM Compare stored version with package.json version
if "%PACKAGE_VERSION%" neq "%NEXT_VERSION%" (
    echo "Version mismatch detected: .next(%NEXT_VERSION%) vs package.json(%PACKAGE_VERSION%). Running build..."
    call npm run build
    echo %PACKAGE_VERSION% > "%NEXT_VERSION%"
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
