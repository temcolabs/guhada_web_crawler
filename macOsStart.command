#!/bin/bash
cd "$(dirname "$0")" # 현재 디렉토리로 이동

# 3000번 포트 확인 및 종료
detect_and_kill_port(){
  echo "포트 3000이 사용 중인지 확인하는 중..."
PID=$(lsof -t -i:3000) # 포트 3000 사용 중인 프로세스 ID 가져오기
if [ -n "$PID" ]; then
  echo "포트 3000이 PID $PID에 의해 사용 중입니다. 프로세스를 종료합니다..."
  kill -9 $PID
  echo "프로세스 $PID가 종료되었습니다."
else
  echo "포트 3000이 사용되지 않고 있습니다."
fi
}


# 최신코드 받아오기
update_code(){
  echo "Git에서 최신 코드를 가져오는 중..."
  npm run getLastVersionMacOs
}

# 의존성 설치
install_dependencies(){
echo "필요한 패키지를 설치하는 중..."
npm install -f
}

# .next 폴더 확인 및 빌드 조건 로직
check_and_build(){
  NEXT_DIR=".next"
  PACKAGE_VERSION=$(grep '"version"' package.json | sed -E 's/.*"version": "([^"]+)".*/\1/')
  NEXT_VERSION_FILE="$NEXT_DIR/version.txt"

  if [ ! -d "$NEXT_DIR" ]; then
    echo ".next 폴더가 존재하지 않습니다. 빌드를 실행합니다..."
    npm run build
    echo "package.json version : $PACKAGE_VERSION"  nextBuild version "$NEXT_VERSION_FILE"
  elif [ -f "$NEXT_VERSION_FILE" ]; then
    STORED_VERSION=$(cat "$NEXT_VERSION_FILE")
    if [ "$STORED_VERSION" != "$PACKAGE_VERSION" ]; then
    # 이미 .next 폴더가있고 해당 폴더의 version과 새로 pull 받은 내용의 package.json 버전이 다를때
      echo "버전 불일치: .next ($STORED_VERSION) vs package.json ($PACKAGE_VERSION). 빌드를 실행합니다..."
      npm run build
      echo "$PACKAGE_VERSION" > "$NEXT_VERSION_FILE"
    else
    # .next 폴더도 있고 package.json의 버전도 같을떄 build 스킵
      echo "버전이 일치합니다. 빌드를 건너뜁니다."
    fi
  else
    echo ".next 폴더에 버전 파일이 없습니다. 빌드를 실행합니다..."
    npm run build
    echo "$PACKAGE_VERSION" > "$NEXT_VERSION_FILE"
  fi
}


start_server(){
  # 백그라운드에서 서버 실행
  echo "Starting npm run MacOs..."
  npm run start > server.log 2>&1 &
  # 서버 준비 대기
  echo "Waiting for the server to be ready at http://localhost:3000..."
  npx wait-on http://localhost:3000
  open http://localhost:3000
}

# 실행 흐름
detect_and_kill_port
update_code
install_dependencies
check_and_build
start_server

# 프로그램 관리 메뉴 표시
while true; do
  clear
  echo "==== 프로그램 관리 메뉴 ===="
  echo "1. 브라우저 열기 (http://localhost:3000)"
  echo "2. 실시간 업데이트"
  echo "3. 서버 종료"
  echo "4. 서버 다시키기"
  echo "5. 종료"
  echo "============================"
  read -p "선택: " choice

  case $choice in
    1)
      echo "브라우저 키는중"
      open http://localhost:3000
      echo "Browser opened."
      ;;
    2)
      echo "실시간 업데이트 서버를 종료합니다......"
      pkill -f "next dev" # Next.js 서버 종료
      echo "다시 업데이트중입니다 잠시만 기다려주세요..."
      detect_and_kill_port
      update_code
      install_dependencies
      check_and_build
      start_server
      ;;
    3)
      echo "서버끄기"
      pkill -f "next dev" # Next.js 서버 종료
      echo "서버를 종료했습니다."
      ;;
    4)
      echo "서버키기"
      start_server
      ;;
    5)
      echo "서버끄는중"
      pkill -f "next dev" # Next.js 서버 종료
      echo "프로그램을 종료합니다."
      exit 0
      kill -9 $$
      ;;
    *)
      echo "유효하지 않은 선택입니다. 다시 시도하세요."
      ;;
  esac

  # 작업 완료 후 메뉴 표시 유지
  echo "\nEnter를 눌러 메뉴로 돌아갑니다."
  read
done