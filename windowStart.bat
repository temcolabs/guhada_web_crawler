@echo off
cd /d "%~dp0"

where npm >nul 2>&1
if errorlevel 1 (
    echo "npm 명령어를 찾을 수 없습니다. Node.js가 설치되어 있는지 확인하세요."
    pause
    exit /b 1
)

REM npm install 실행
echo "Installing dependencies..."
npm install -f
pause
REM npm run dev 실행
echo "Starting npm run dev..."
@REM call npm run dev

pause