@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

REM npm 경로 확인
where npm >nul 2>&1
if errorlevel 1 (
    echo "npm 명령어를 찾을 수 없습니다. Node.js가 설치되어 있는지 확인하세요."
    pause
    exit /b 1
)

REM 최신 코드 가져오기
echo "Git에서 최신 코드를 가져오는 중..."
call npm run getLastVersionWindow

REM npm install 실행
echo "Installing dependencies..."
call npm install -f

set "NEXT_DIR=.next"
set "NEXT_VERSION_FILE=%NEXT_DIR%\version.txt"

REM package.json에서 version 값 가져오기 (PowerShell 사용)
for /f "delims=" %%a in ('powershell -command "(Get-Content package.json -Raw | ConvertFrom-Json).version"') do set "PACKAGE_VERSION=%%a"

REM .next 폴더 확인
if not exist "%NEXT_DIR%" (
    echo ".next 폴더가 존재하지 않습니다. 빌드를 실행합니다..."
    call npm run build
    echo %PACKAGE_VERSION% > "%NEXT_VERSION_FILE%"
    goto :START_SERVER
)

REM version.txt 파일이 있는지 확인
if exist "%NEXT_VERSION_FILE%" (
    set /p STORED_VERSION=<"%NEXT_VERSION_FILE%"
    if "%STORED_VERSION%" neq "%PACKAGE_VERSION%" (
        echo "버전 불일치: .next (%STORED_VERSION%) vs package.json (%PACKAGE_VERSION%). 빌드를 실행합니다..."
        call npm run build
        echo %PACKAGE_VERSION% > "%NEXT_VERSION_FILE%"
    ) else (
        echo "버전이 일치합니다. 빌드를 건너뜁니다."
    )
) else (
    echo ".next 폴더에 버전 파일이 없습니다. 빌드를 실행합니다..."
    call npm run build
    echo %PACKAGE_VERSION% > "%NEXT_VERSION_FILE%"
)

:START_SERVER
echo "Starting npm run start..."
call npm run start

REM CMD 창이 자동으로 닫히지 않도록 유지
pause
