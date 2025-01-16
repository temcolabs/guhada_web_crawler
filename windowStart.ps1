# 현재 스크립트 파일의 위치로 이동
Set-Location -Path $PSScriptRoot

# npm이 설치되어 있는지 확인
if (-not (Get-Command "npm" -ErrorAction SilentlyContinue)) {
    Write-Host "npm 명령어를 찾을 수 없습니다. Node.js가 설치되어 있는지 확인하세요." -ForegroundColor Red
    Pause
    Exit 1
}

# npm install 실행
Write-Host "Installing dependencies..." -ForegroundColor Green
npm run init
if ($LASTEXITCODE -ne 0) {
    Write-Host "npm install 실패!" -ForegroundColor Red
    Pause
    Exit 1
}

# 새로운 터미널 창에서 npm run dev 실행
Write-Host "Starting npm run dev in a new terminal..." -ForegroundColor Green
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/k npm run devWindow"

# 종료 방지
Pause
