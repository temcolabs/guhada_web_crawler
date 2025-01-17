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

REM Start the server initially
call :GetLatestCode 
call :InstallDependencies 
call :CheckAndBuild
call :StartServer

REM Main menu loop
:MENU_LOOP
cls
echo =====================================
echo        Program Management Menu
echo =====================================
echo 1. Open Browser (http://localhost:3000)
echo 2. Live Update
echo 3. Stop Server
echo 4. Restart Server
echo 5. Exit Program
echo =====================================
choice /c 12345 /n /m "Select an option: "

if errorlevel 5 goto EXIT_PROGRAM
if errorlevel 4 goto RESTART_SERVER
if errorlevel 3 goto STOP_SERVER
if errorlevel 2 goto LIVE_UPDATE
if errorlevel 1 goto OPEN_BROWSER

goto MENU_LOOP




REM ===============================
REM Option 1: Open Browser
REM ===============================
:OPEN_BROWSER
echo "Opening browser..."
start http://localhost:3000
echo "Browser opened successfully!"
timeout /t 2 >nul
goto MENU_LOOP

REM ===============================
REM Option 2: Live Update
REM ===============================
:LIVE_UPDATE
echo "Stopping server for live update..."
call :StopServer
echo "Updating code and dependencies..."
call :GetLatestCode
call :InstallDependencies
call :CheckAndBuild
call :StartServer
echo "Live update complete!"
timeout /t 2 >nul
goto MENU_LOOP

REM ===============================
REM Option 3: Stop Server
REM ===============================
:STOP_SERVER
echo "Stopping the Next.js server..."
call :StopServer
echo "Server stopped successfully!"
timeout /t 2 >nul
goto MENU_LOOP

REM ===============================
REM Option 4: Restart Server
REM ===============================
:RESTART_SERVER
echo "Restarting server..."
call :StopServer
call :StartServer
echo "Server restarted successfully!"
timeout /t 2 >nul
goto MENU_LOOP

REM ===============================
REM Option 5: Exit Program
REM ===============================
:EXIT_PROGRAM
echo "Stopping server before exiting..."
call :StopServer
echo "Exiting program..."
taskkill /f /im cmd.exe
timeout /t 2 >nul
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
npx playwright install
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
    echo|set /p=%PACKAGE_VERSION%>"%NEXT_VERSION_FILE%"
    exit /b
)

REM Check if version.txt exists
if not exist "%NEXT_VERSION_FILE%" (
    echo "No version file found in .next folder. Running build..."
    call npm run build
    echo|set /p=%PACKAGE_VERSION%>"%NEXT_VERSION_FILE%"
    exit /b
)

REM Read stored version from version.txt and trim spaces
for /f "tokens=* delims=" %%b in ('type "%NEXT_VERSION_FILE%"') do set "STORED_VERSION=%%b"

REM Trim trailing spaces
:TRIM_LOOP
if not "%STORED_VERSION:~-1%"==" " goto :END_TRIM
set "STORED_VERSION=%STORED_VERSION:~0,-1%"
goto :TRIM_LOOP

:END_TRIM

REM Compare stored version with package.json version
if "%STORED_VERSION%" neq "%PACKAGE_VERSION%" (
    echo "Version mismatch detected: .next (%STORED_VERSION%) vs package.json (%PACKAGE_VERSION%). Running build..."
    call npm run build
    echo|set /p=%PACKAGE_VERSION%>"%NEXT_VERSION_FILE%"
) else (
    echo "Version matches. Skipping build."
)

exit /b

REM ===============================
REM Stop Next.js server
REM ===============================
:StopServer
echo "Stopping Next.js server..."
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo "Stopping process using port 3000 (PID: %%a)..."
    taskkill /PID %%a /F
    echo "Process %%a has been terminated."
)
exit /b

REM ===============================
REM Start Next.js server
REM ===============================
:StartServer
echo "Starting Next.js server..."

REM 기존 CMD에서 서버 실행 & 로그 저장
start /b cmd /c "npm run start > server.log 2>&1"

REM Wait for the server to become available
echo "Waiting for server at http://localhost:3000..."
@REM wait-on http://localhost:3000

REM Open the browser once the server is ready
echo "Server is ready! Opening browser..."
start http://localhost:3000

REM Return to menu
goto MENU_LOOP
