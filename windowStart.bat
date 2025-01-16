@echo off
REM 현재 파일의 디렉토리로 이동
cd /d "%~dp0"

REM start.sh 실행
@REM bash start.sh
npm run init
npm run dev