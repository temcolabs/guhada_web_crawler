@echo off
REM npm install 실행
npm -v || echo "npm 명령어를 찾을 수 없습니다."
pause
npm install -f || echo "npm install 실패"
pause
call npm run dev || echo "npm run dev 실패"
pause
REM 종료 방지
pause