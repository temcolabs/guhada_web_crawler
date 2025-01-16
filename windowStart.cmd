@echo off
cd /d "%~dp0"

REM 3000번 포트 사용 여부 확인 및 종료
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo "Port 3000 is in use. Terminating process..."
    taskkill /PID %%a /F
    timeout /t 2 /nobreak >nul
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