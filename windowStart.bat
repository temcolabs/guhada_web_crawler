@echo off
chcp 65001 >nul  REM UTF-8 설정
cd /d "%~dp0"  REM 현재 디렉토리로 이동

:: 관리자 권한 확인 및 자동 실행
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo 관리자 권한이 필요합니다. 관리자 모드로 다시 실행합니다...
    powershell start -verb runAs cmd /c "%~f0"
    exit /b
)

:: 포트 확인 및 종료 함수
:DetectAndKillPort
echo 포트 3000이 사용 중인지 확인하는 중...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo 포트 3000이 PID %%a에 의해 사용 중입니다. 프로세스를 종료합니다...
    taskkill /PID %%a /F
    echo 프로세스 %%a가 종료되었습니다.
)
goto :eof

:: 최신 코드 가져오기 함수
:UpdateCode
echo Git에서 최신 코드를 가져오는 중...
 echo "Git에서 최신 코드를 가져오는 중..."
 npm run getLastVersionWindow
goto :eof

:: 의존성 설치 함수
:InstallDependencies
echo 필요한 패키지를 설치하는 중...
npm install -f
goto :eof

:: 빌드 확인 및 실행 함수
:CheckAndBuild
set NEXT_DIR=.next
for /f "tokens=2 delims=:," %%a in ('findstr /C:"version" package.json') do set PACKAGE_VERSION=%%~a
set PACKAGE_VERSION=%PACKAGE_VERSION: =%
set PACKAGE_VERSION=%PACKAGE_VERSION:"=%

if not exist "%NEXT_DIR%" (
    echo .next 폴더가 존재하지 않습니다. 빌드를 실행합니다...
    npm run build
    echo %PACKAGE_VERSION% > "%NEXT_DIR%\version.txt"
) else if exist "%NEXT_DIR%\version.txt" (
    set /p STORED_VERSION=<"%NEXT_DIR%\version.txt"
    if not "%STORED_VERSION%"=="%PACKAGE_VERSION%" (
        echo 버전 불일치: .next (%STORED_VERSION%) vs package.json (%PACKAGE_VERSION%). 빌드를 실행합니다...
        npm run build
        echo %PACKAGE_VERSION% > "%NEXT_DIR%\version.txt"
    ) else (
        echo 버전이 일치합니다. 빌드를 건너뜁니다.
    )
) else (
    echo .next 폴더에 버전 파일이 없습니다. 빌드를 실행합니다...
    npm run build
    echo %PACKAGE_VERSION% > "%NEXT_DIR%\version.txt"
)
goto :eof

:: 서버 시작 함수
:StartServer
echo Next.js 서버를 시작하는 중...
start cmd /c "npm start > server.log 2>&1"
echo 서버가 http://localhost:3000 에서 실행될 때까지 대기 중...
npx wait-on http://localhost:3000
start http://localhost:3000
goto :eof

:: 실행 흐름
call :DetectAndKillPort
call :UpdateCode
call :InstallDependencies
call :CheckAndBuild
call :StartServer

:: 프로그램 관리 메뉴 표시
:Menu
cls
echo ==== 프로그램 관리 메뉴 ====
echo 1. 브라우저 열기 (http://localhost:3000)
echo 2. 실시간 업데이트
echo 3. 서버 종료
echo 4. 서버 다시 시작
echo 5. 종료 (터미널 포함)
echo ============================
set /p choice=선택: 

if "%choice%"=="1" (
    echo 브라우저를 여는 중...
    start http://localhost:3000
    goto Menu
)
if "%choice%"=="2" (
    echo 실시간 업데이트 중...
    call :DetectAndKillPort
    call :UpdateCode
    call :InstallDependencies
    call :CheckAndBuild
    call :StartServer
    goto Menu
)
if "%choice%"=="3" (
    echo 서버를 종료하는 중...
    taskkill /IM node.exe /F
    echo 서버가 종료되었습니다.
    goto Menu
)
if "%choice%"=="4" (
    echo 서버를 다시 시작하는 중...
    call :StartServer
    goto Menu
)
if "%choice%"=="5" (
    echo 서버 및 터미널을 종료하는 중...
    taskkill /IM node.exe /F
    echo 프로그램과 터미널을 종료합니다.
    exit
)

echo 유효하지 않은 선택입니다. 다시 시도하세요.
pause
goto Menu



