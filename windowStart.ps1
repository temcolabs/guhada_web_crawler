# PowerShell 스크립트 시작
$ErrorActionPreference = "Stop"

# 현재 스크립트 디렉토리로 이동
Set-Location -Path $PSScriptRoot

# 포트 확인 및 종료 함수
function Detect-AndKillPort {
    Write-Host "포트 3000이 사용 중인지 확인하는 중..."
    $PID = netstat -ano | Select-String ":3000" | ForEach-Object { ($_ -split '\s+')[-1] }
    if ($PID) {
        Write-Host "포트 3000이 PID $PID에 의해 사용 중입니다. 프로세스를 종료합니다..."
        Stop-Process -Id $PID -Force -ErrorAction SilentlyContinue
        Write-Host "프로세스 $PID가 종료되었습니다."
    } else {
        Write-Host "포트 3000이 사용되지 않고 있습니다."
    }
}

# 최신 코드 가져오기 함수
function Update-Code {
    Write-Host "Git에서 최신 코드를 가져오는 중..."
    git checkout main
    if (-not $?) {
        Write-Host "Git checkout 실패"
        exit 1
    }
    git pull origin main
    if (-not $?) {
        Write-Host "최신 코드를 가져오는 데 실패했습니다."
        exit 1
    }
}

# 의존성 설치 함수
function Install-Dependencies {
    Write-Host "필요한 패키지를 설치하는 중..."
    npm install -f
}

# 빌드 확인 및 실행 함수
function Check-AndBuild {
    $NEXT_DIR = ".next"
    $PACKAGE_VERSION = (Get-Content package.json | ConvertFrom-Json).version
    $NEXT_VERSION_FILE = "$NEXT_DIR/version.txt"
    
    if (-not (Test-Path $NEXT_DIR)) {
        Write-Host ".next 폴더가 존재하지 않습니다. 빌드를 실행합니다..."
        npm run build
        $PACKAGE_VERSION | Set-Content -Path $NEXT_VERSION_FILE
    } elseif (Test-Path $NEXT_VERSION_FILE) {
        $STORED_VERSION = Get-Content $NEXT_VERSION_FILE
        if ($STORED_VERSION -ne $PACKAGE_VERSION) {
            Write-Host "버전 불일치: .next ($STORED_VERSION) vs package.json ($PACKAGE_VERSION). 빌드를 실행합니다..."
            npm run build
            $PACKAGE_VERSION | Set-Content -Path $NEXT_VERSION_FILE
        } else {
            Write-Host "버전이 일치합니다. 빌드를 건너뜁니다."
        }
    } else {
        Write-Host ".next 폴더에 버전 파일이 없습니다. 빌드를 실행합니다..."
        npm run build
        $PACKAGE_VERSION | Set-Content -Path $NEXT_VERSION_FILE
    }
}

# 서버 시작 함수
function Start-Server {
    Write-Host "Next.js 서버를 시작하는 중..."
    Start-Process -NoNewWindow -FilePath "cmd" -ArgumentList "/c npm start > server.log 2>&1"
    Write-Host "서버가 http://localhost:3000 에서 실행될 때까지 대기 중..."
    npx wait-on http://localhost:3000
    Start-Process "http://localhost:3000"
}

# 실행 흐름
Detect-AndKillPort
Update-Code
Install-Dependencies
Check-AndBuild
Start-Server

# 프로그램 관리 메뉴 표시
while ($true) {
    Clear-Host
    Write-Host "==== 프로그램 관리 메뉴 ===="
    Write-Host "1. 브라우저 열기 (http://localhost:3000)"
    Write-Host "2. 실시간 업데이트"
    Write-Host "3. 서버 종료"
    Write-Host "4. 서버 다시 시작"
    Write-Host "5. 종료 (터미널 포함)"
    Write-Host "============================"
    $choice = Read-Host "선택"

    switch ($choice) {
        "1" {
            Write-Host "브라우저를 여는 중..."
            Start-Process "http://localhost:3000"
        }
        "2" {
            Write-Host "실시간 업데이트 중..."
            Detect-AndKillPort
            Update-Code
            Install-Dependencies
            Check-AndBuild
            Start-Server
        }
        "3" {
            Write-Host "서버를 종료하는 중..."
            Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
            Write-Host "서버가 종료되었습니다."
        }
        "4" {
            Write-Host "서버를 다시 시작하는 중..."
            Start-Server
        }
        "5" {
            Write-Host "서버 및 터미널을 종료하는 중..."
            Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
            Write-Host "프로그램과 터미널을 종료합니다."
            exit
        }
        default {
            Write-Host "유효하지 않은 선택입니다. 다시 시도하세요."
        }
    }
    Read-Host "Enter 키를 눌러 메뉴로 돌아갑니다"
}
