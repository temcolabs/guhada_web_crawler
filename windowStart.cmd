@echo off
cd /d "%~dp0"

REM 3000번 포트 사용 여부 확인 및 종료 (강제 종료)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo "Port 3000 is in use. Trying to terminate process..."
    
    REM 프로세스 이름 확인
    for /f "tokens=2 delims=," %%b in ('wmic process where "ProcessId=%%a" get Name /format:csv ^| findstr /v "Node"') do (
        echo "Found process: %%b (PID: %%a)"
        
        REM 프로세스 종료 (강제 종료)
        wmic process where "ProcessId=%%a" delete
        echo "Process %%b (PID: %%a) has been terminated."
    )
    
    timeout /t 2 /nobreak >nul
)

REM npm 경로 확인
where npm >nul 2>&1
if errorlevel 1 (
    echo "npm 명령어를 찾을 수 없습니다. Node.js가 설치되어 있는지 확인하세요."
    pause
    exit /b 1
)

REM npm install 실행
echo "Installing dependencies..."
call npm run init


REM 새로운 터미널 창에서 npm run dev 실행
echo "Starting npm run dev..."
start cmd /k "npm run devWindow"