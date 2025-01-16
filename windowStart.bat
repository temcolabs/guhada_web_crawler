@echo off
REM 현재 디렉토리로 이동
cd /d "%~dp0"


npm install -f


npm run dev

REM 종료를 방지하기 위해 대기
pause
