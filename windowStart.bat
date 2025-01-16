@echo off
REM 현재 디렉토리로 이동
cd /d "%~dp0"

REM npm run init 실행
npm install -f

REM npm run dev 실행
npm run dev

REM 종료를 방지하기 위해 대기
pause
