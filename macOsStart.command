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


# 최신코드 받아오기
echo "pull new Code"
npm run getLastVersionMacOs

# 의존성 설치
echo "Installing dependencies..."
npm install -f

# .next 폴더 확인 및 빌드 조건 로직
NEXT_DIR=".next"
PACKAGE_VERSION=$(grep '"version"' package.json | sed -E 's/.*"version": "([^"]+)".*/\1/')
NEXT_VERSION_FILE="$NEXT_DIR/version.txt"

if [ ! -d "$NEXT_DIR" ]; then
  echo ".next 폴더가 없습니다."
  npm run build
  echo "package.json version : $PACKAGE_VERSION"  nextBuild version "$NEXT_VERSION_FILE"
elif [ -f "$NEXT_VERSION_FILE" ]; then
  STORED_VERSION=$(cat "$NEXT_VERSION_FILE")
  if [ "$STORED_VERSION" != "$PACKAGE_VERSION" ]; then
  # 이미 .next 폴더가있고 해당 폴더의 version과 새로 pull 받은 내용의 package.json 버전이 다를때
    echo "버전이 다름니다! : .next ($STORED_VERSION) vs package.json ($PACKAGE_VERSION). 빌드를 시작합니다."
   npm run build
    echo "$PACKAGE_VERSION" > "$NEXT_VERSION_FILE"
  else
  # .next 폴더도 있고 package.json의 버전도 같을떄 build 스킵
    echo "버전이 같습니다 build를 스킵합니다."
  fi
else
  echo ".next 파일에 버전 파일이 없습니다."
  npm run build
  echo "$PACKAGE_VERSION" > "$NEXT_VERSION_FILE"
fi


# 백그라운드에서 서버 실행
echo "Starting npm run MacOs..."
npm run start > server.log 2>&1 &

# 서버 준비 대기
echo "Waiting for the server to be ready at http://localhost:3000..."
npx wait-on http://localhost:3000
open http://localhost:3000


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