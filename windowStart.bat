@echo off
REM 현재 디렉토리로 이동
cd /d "%~dp0"

REM npm install 실행
npm install -f

REM npm run dev 실행
call npm run dev

