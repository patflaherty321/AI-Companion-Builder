@echo off
echo ================================
echo Builder.io GitHub Integration Test
echo ================================

echo.
echo Starting Builder.io integrated Avatar-ANIM application...
echo.

cd /d "c:\Users\pflaherty\Documents\ai-chatbot-project\electron-ui"

echo [1/3] Building application...
call npm run build-dev
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Starting backend (optional - will use mock data if unavailable)...
start /B python ..\avatar_api_mock.py
timeout /t 3 /nobreak >nul

echo.
echo [3/3] Launching Electron application with Builder.io integration...
call npm run start-simple

echo.
echo ================================
echo Application started!
echo ================================
echo.
echo TO CONNECT TO BUILDER.IO:
echo 1. Go to https://builder.io and login
echo 2. Navigate to Account Settings ^> Integrations
echo 3. Connect your GitHub repository: ai-chatbot-project
echo 4. Create content in Builder.io visual editor
echo 5. Replace placeholder content IDs in BuilderConfig.ts
echo.
echo CHECK CONSOLE for Builder.io configuration status
echo.
pause
