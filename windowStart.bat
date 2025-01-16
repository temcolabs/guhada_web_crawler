@echo off
chcp 65001 >nul  REM UTF-8 설정

:: 관리자 권한 확인 및 자동 실행
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo 관리자 권한이 필요합니다. 관리자 모드로 다시 실행합니다...
    powershell start -verb runAs cmd /c "%~f0"
    exit /b
)

cd /d "%~dp0"  REM 현재 디렉토리로 이동

:: 서버 종료 함수
:StopServer
echo 서버를 종료하는 중...
wmic process where name="node.exe" delete
echo 서버가 종료되었습니다.
goto Menu

:: 실행 흐름
call :StopServer

:: 프로그램 관리 메뉴 표시
:Menu
cls
echo ==== 프로그램 관리 메뉴 ====
echo 1. 서버 다시 시작
echo 2. 종료 (터미널 포함)
echo ============================
set /p choice=선택: 

if "%choice%"=="1" (
    echo 서버를 다시 시작하는 중...
    call :StartServer
    goto Menu
)
if "%choice%"=="2" (
    echo 프로그램 및 서버 종료 중...
    wmic process where name="node.exe" delete
    exit
)

echo 유효하지 않은 선택입니다. 다시 시도하세요.
pause
goto Menu
