@echo off
echo current directory : %cd%

REM 현재 디렉토리로 이동
cd /d "%~dp0"

REM npm 설치 확인
npm -v || echo "npm 명령어를 찾을 수 없습니다."

REM npm install 실행
npm install -f || echo "npm install 실패"

REM npm run dev 실행
call npm run dev || echo "npm run dev 실패"

REM 종료 방지
pause