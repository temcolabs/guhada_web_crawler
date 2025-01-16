#!/bin/bash
cd "$(dirname "$0")" # 현재 디렉토리로 이동

# 포트 확인 및 종료 함수
detect_and_kill_port() {
  echo "포트 3000이 사용 중인지 확인하는 중..."
  PID=$(lsof -t -i:3000)
  if [ -n "$PID" ]; then
    echo "포트 3000이 PID $PID에 의해 사용 중입니다. 프로세스를 종료합니다..."
    kill -9 $PID
    echo "프로세스 $PID가 종료되었습니다."
  else
    echo "포트 3000이 사용되지 않고 있습니다."
  fi
}

# 최신 코드 가져오기 함수
update_code() {
  echo "Git에서 최신 코드를 가져오는 중..."
  git checkout main
  if ! git pull origin main; then
    echo "최신 코드를 가져오는 데 실패했습니다."
    exit 1
  fi
}

# 의존성 설치 함수
install_dependencies() {
  echo "필요한 패키지를 설치하는 중..."
  npm install -f
}

# 빌드 확인 및 실행 함수
check_and_build() {
  NEXT_DIR=".next"
  PACKAGE_VERSION=$(grep '"version"' package.json | sed -E 's/.*"version": "\([^\"]+\)".*/\1/')
  NEXT_VERSION_FILE="$NEXT_DIR/version.txt"

  if [ ! -d "$NEXT_DIR" ]; then
    echo ".next 폴더가 존재하지 않습니다. 빌드를 실행합니다..."
    next build
    echo "$PACKAGE_VERSION" > "$NEXT_VERSION_FILE"
  elif [ -f "$NEXT_VERSION_FILE" ]; then
    STORED_VERSION=$(cat "$NEXT_VERSION_FILE")
    if [ "$STORED_VERSION" != "$PACKAGE_VERSION" ]; then
      echo "버전 불일치: .next ($STORED_VERSION) vs package.json ($PACKAGE_VERSION). 빌드를 실행합니다..."
      next build
      echo "$PACKAGE_VERSION" > "$NEXT_VERSION_FILE"
    else
      echo "버전이 일치합니다. 빌드를 건너뜁니다."
    fi
  else
    echo ".next 폴더에 버전 파일이 없습니다. 빌드를 실행합니다..."
    next build
    echo "$PACKAGE_VERSION" > "$NEXT_VERSION_FILE"
  fi
}

# 서버 시작 함수
start_server() {
  echo "Next.js 서버를 시작하는 중..."
  next start > server.log 2>&1 &
  echo "서버가 http://localhost:3000 에서 실행될 때까지 대기 중..."
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
  echo "2. 서버 종료"
  echo "3. 종료"
  echo "============================"
  read -p "선택: " choice

  case $choice in
    1)
      echo "브라우저를 여는 중..."
      open http://localhost:3000
      echo "브라우저가 열렸습니다."
      ;;
    2)
      echo "서버를 종료하는 중..."
      pkill -f "next start" # Next.js 서버 종료
      echo "서버가 종료되었습니다."
      ;;
    3)
      echo "서버를 종료하는 중..."
      pkill -f "next start" # Next.js 서버 종료
      echo "프로그램을 종료합니다."
      exit 0
      ;;
    *)
      echo "잘못된 선택입니다. 다시 시도하세요."
      ;;
  esac

  # 작업 완료 후 메뉴 표시 유지
  echo "\nEnter 키를 눌러 메뉴로 돌아갑니다."
  read
done
