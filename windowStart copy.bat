npm run dev

@REM @echo off
@REM chcp 65001 >nul  REM UTF-8 Encoding
@REM @REM cd /d "%~dp0"  REM Move to current directory
@REM :: 관리자 권한 확인 및 자동 실행
@REM net session >nul 2>&1
@REM if %errorLevel% neq 0 (
@REM     echo 관리자 권한이 필요합니다. 관리자 모드로 다시 실행합니다...
@REM     powershell start -verb runAs cmd /c "%~f0"
@REM     exit /b
@REM )
@REM :: Function to check and terminate port 3000
@REM @REM :DetectAndKillPort
@REM @REM echo Checking if port 3000 is in use...
@REM @REM for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
@REM @REM     echo Port 3000 is in use by PID %%a. Terminating process...
@REM @REM     wmic process where ProcessId=%%a delete
@REM @REM     echo Process %%a has been terminated.
@REM @REM     goto :eof
@REM @REM )
@REM @REM goto :eof

@REM :: Function to fetch the latest code
@REM :UpdateCode
@REM echo Fetching the latest code from Git...
@REM npm run getLastVersionWindow
@REM goto :eof

@REM :: Function to install dependencies
@REM :InstallDependencies
@REM echo Installing required dependencies...
@REM npm install -f
@REM goto :eof

@REM :: Function to check and execute build
@REM :CheckAndBuild
@REM set NEXT_DIR=.next
@REM for /f "tokens=2 delims=:," %%a in ('findstr /C:"version" package.json') do set PACKAGE_VERSION=%%~a
@REM set PACKAGE_VERSION=%PACKAGE_VERSION: =%
@REM set PACKAGE_VERSION=%PACKAGE_VERSION:"=%

@REM if not exist "%NEXT_DIR%" (
@REM     echo .next folder does not exist. Executing build...
@REM     npm run build
@REM     echo %PACKAGE_VERSION% > "%NEXT_DIR%\version.txt"
@REM ) else if exist "%NEXT_DIR%\version.txt" (
@REM     set /p STORED_VERSION=<"%NEXT_DIR%\version.txt"
@REM     if not "%STORED_VERSION%"=="%PACKAGE_VERSION%" (
@REM         echo Version mismatch: .next (%STORED_VERSION%) vs package.json (%PACKAGE_VERSION%). Executing build...
@REM         npm run build
@REM         echo %PACKAGE_VERSION% > "%NEXT_DIR%\version.txt"
@REM     ) else (
@REM         echo Versions match. Skipping build.
@REM     )
@REM ) else (
@REM     echo No version file found in .next. Executing build...
@REM     npm run build
@REM     echo %PACKAGE_VERSION% > "%NEXT_DIR%\version.txt"
@REM )
@REM goto :eof

@REM :: Function to start the server
@REM :StartServer
@REM echo Starting Next.js server...
@REM start cmd /c "npm start > server.log 2>&1"
@REM echo Waiting for the server to be ready at http://localhost:3000...
@REM npx wait-on http://localhost:3000
@REM start http://localhost:3000
@REM goto :eof

@REM :: Execution flow
@REM @REM call :DetectAndKillPort
@REM call :UpdateCode
@REM call :InstallDependencies
@REM call :CheckAndBuild
@REM call :StartServer

@REM :: Display program management menu
@REM :Menu
@REM cls
@REM echo ==== Program Management Menu ====
@REM echo 1. Open browser (http://localhost:3000)
@REM echo 2. Real-time update
@REM echo 3. Stop server
@REM echo 4. Restart server
@REM echo 5. Exit (including terminal)
@REM echo ==================================
@REM set /p choice=Selection: 

@REM if "%choice%"=="1" (
@REM     echo Opening browser...
@REM     start http://localhost:3000
@REM     goto Menu
@REM )
@REM if "%choice%"=="2" (
@REM     echo Performing real-time update...
@REM     call :DetectAndKillPort
@REM     call :UpdateCode
@REM     call :InstallDependencies
@REM     call :CheckAndBuild
@REM     call :StartServer
@REM     goto Menu
@REM )
@REM if "%choice%"=="3" (
@REM     echo Stopping the server...
@REM     taskkill /IM node.exe /F
@REM     echo Server has been stopped.
@REM     goto Menu
@REM )
@REM if "%choice%"=="4" (
@REM     echo Restarting the server...
@REM     call :StartServer
@REM     goto Menu
@REM )
@REM if "%choice%"=="5" (
@REM     echo Stopping server and exiting terminal...
@REM     taskkill /IM node.exe /F
@REM     echo Program and terminal exiting.
@REM     exit
@REM )

@REM echo Invalid selection. Please try again.
@REM pause
@REM goto Menu
