@echo off
REM 현재 디렉토리로 이동
cd /d "%~dp0"
npm install -f
npm run dev
pause
