#!/bin/bash
cd "$(dirname "$0")" # 현재 디렉토리로 이동

# 3000번 포트 확인 및 종료
echo "Checking if port 3000 is in use..."
PID=$(lsof -t -i:3000) # 포트 3000 사용 중인 프로세스 ID 가져오기
if [ -n "$PID" ]; then
  echo "Port 3000 is in use by PID $PID. Killing the process..."
  kill -9 $PID
  echo "Process $PID has been terminated."
else
  echo "Port 3000 is not in use."
fi

# 의존성 설치
# echo "Installing dependencies..."
# npm run init

# 백그라운드에서 서버 실행
echo "Starting npm run MacOs..."
npm run MacOs > server.log 2>&1 &

# 서버 준비 대기
echo "Waiting for the server to be ready at http://localhost:3000..."
npx wait-on http://localhost:3000


# 프로그램 관리 메뉴 표시
while true; do
  clear
  echo "==== 프로그램 관리 메뉴 ===="
  echo "1. 브라우저 열기 (http://localhost:3000)"
  echo "2. 서버 종료"
  echo "3. 종료"
  echo "============================"
  read -p "선택: " choice

  case $choice in
    1)
      echo "Opening browser..."
      open http://localhost:3000
      echo "Browser opened."
      ;;
    2)
      echo "Stopping the server..."
      pkill -f "next dev" # Next.js 서버 종료
      echo "서버를 종료했습니다."
      ;;
    3)
      echo "Stopping the server..."
      pkill -f "next dev" # Next.js 서버 종료
      echo "프로그램을 종료합니다."
      exit 0
      ;;
    *)
      echo "유효하지 않은 선택입니다. 다시 시도하세요."
      ;;
  esac

  # 작업 완료 후 메뉴 표시 유지
  echo "\nEnter를 눌러 메뉴로 돌아갑니다."
  read
done