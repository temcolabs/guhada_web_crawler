@echo off
chcp 65001 >nul  REM UTF-8 Encoding
cd /d "%~dp0"  REM Move to current directory
:: 관리자 권한 확인 및 자동 실행
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo 관리자 권한이 필요합니다. 관리자 모드로 다시 실행합니다...
    powershell start -verb runAs cmd /c "%~f0"
    exit /b
)
:: Function to check and terminate port 3000
:DetectAndKillPort
echo Checking if port 3000 is in use...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Port 3000 is in use by PID %%a. Terminating process...
    wmic process where ProcessId=%%a delete
    echo Process %%a has been terminated.
)
goto :eof

:: Function to fetch the latest code
:UpdateCode
echo Fetching the latest code from Git...
npm run getLastVersionWindow
goto :eof

:: Function to install dependencies
:InstallDependencies
echo Installing required dependencies...
npm install -f
goto :eof

:: Function to check and execute build
:CheckAndBuild
set NEXT_DIR=.next
for /f "tokens=2 delims=:," %%a in ('findstr /C:"version" package.json') do set PACKAGE_VERSION=%%~a
set PACKAGE_VERSION=%PACKAGE_VERSION: =%
set PACKAGE_VERSION=%PACKAGE_VERSION:"=%

if not exist "%NEXT_DIR%" (
    echo .next folder does not exist. Executing build...
    npm run build
    echo %PACKAGE_VERSION% > "%NEXT_DIR%\version.txt"
) else if exist "%NEXT_DIR%\version.txt" (
    set /p STORED_VERSION=<"%NEXT_DIR%\version.txt"
    if not "%STORED_VERSION%"=="%PACKAGE_VERSION%" (
        echo Version mismatch: .next (%STORED_VERSION%) vs package.json (%PACKAGE_VERSION%). Executing build...
        npm run build
        echo %PACKAGE_VERSION% > "%NEXT_DIR%\version.txt"
    ) else (
        echo Versions match. Skipping build.
    )
) else (
    echo No version file found in .next. Executing build...
    npm run build
    echo %PACKAGE_VERSION% > "%NEXT_DIR%\version.txt"
)
goto :eof

:: Function to start the server
:StartServer
echo Starting Next.js server...
start cmd /c "npm start > server.log 2>&1"
echo Waiting for the server to be ready at http://localhost:3000...
npx wait-on http://localhost:3000
start http://localhost:3000
goto :eof

:: Execution flow
call :DetectAndKillPort
call :UpdateCode
call :InstallDependencies
call :CheckAndBuild
call :StartServer

:: Display program management menu
:Menu
cls
echo ==== Program Management Menu ====
echo 1. Open browser (http://localhost:3000)
echo 2. Real-time update
echo 3. Stop server
echo 4. Restart server
echo 5. Exit (including terminal)
echo ==================================
set /p choice=Selection: 

if "%choice%"=="1" (
    echo Opening browser...
    start http://localhost:3000
    goto Menu
)
if "%choice%"=="2" (
    echo Performing real-time update...
    call :DetectAndKillPort
    call :UpdateCode
    call :InstallDependencies
    call :CheckAndBuild
    call :StartServer
    goto Menu
)
if "%choice%"=="3" (
    echo Stopping the server...
    taskkill /IM node.exe /F
    echo Server has been stopped.
    goto Menu
)
if "%choice%"=="4" (
    echo Restarting the server...
    call :StartServer
    goto Menu
)
if "%choice%"=="5" (
    echo Stopping server and exiting terminal...
    taskkill /IM node.exe /F
    echo Program and terminal exiting.
    exit
)

echo Invalid selection. Please try again.
pause
goto Menu
