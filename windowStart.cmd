@echo off
cd /d "%~dp0"

REM 3000번 포트 사용 여부 확인 및 종료 (강제 종료)
@echo off
echo Checking for processes using port 3000...

REM 3000번 포트를 사용하는 프로세스 PID 찾기
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Port 3000 is in use. Killing process (PID: %%a)...
    taskkill /PID %%a /F
    echo Process %%a has been terminated.
    goto :END
)

echo Port 3000 is not in use. Skipping termination.

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