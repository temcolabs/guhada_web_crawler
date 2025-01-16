@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

REM 3000번 포트 사용 여부 확인 및 종료 (강제 종료)
echo Checking for processes using port 3000...

set "PORT_KILLED=0"

REM 3000번 포트를 사용하는 프로세스 종료
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Port 3000 is in use. Attempting to kill process (PID: %%a)...
    
    REM taskkill 실행 및 오류 확인
    taskkill /PID %%a /F >nul 2>&1
    if %errorlevel% neq 0 (
        echo ERROR: Failed to terminate process PID: %%a
    ) else (
        echo Process %%a has been successfully terminated.
        set "PORT_KILLED=1"
    )
)

if !PORT_KILLED!==0 (
    echo Port 3000 is not in use. Proceeding...
)

REM CMD가 갑자기 꺼지지 않도록 2초 대기
timeout /t 2 /nobreak >nul
if !PORT_KILLED!==0 (
    echo Port 3000 is not in use. Proceeding...
)

REM npm 경로 확인
where npm >nul 2>&1
if errorlevel 1 (
    echo "npm 명령어를 찾을 수 없습니다. Node.js가 설치되어 있는지 확인하세요."
    pause
    exit /b 1
)

REM npm install 실행
echo "Installing dependencies..."
call npm run init

REM 새로운 터미널 창에서 npm run dev 실행
echo "Starting npm run dev..."
start cmd /k "npm run devWindow"
