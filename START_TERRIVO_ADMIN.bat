@echo off
title Terrivo AI Admin Launcher
echo ==========================================
echo    🚀 STARTING TERRIVO AI ADMIN 🚀
echo ==========================================

:: Change to the root directory
cd /d "%~dp0"

:: Start Netlify Dev for AI Functions (Background)
echo [1/2] Starting AI Functions (Netlify)...
start /b cmd /c "npx netlify dev"

:: Change to studio and start Sanity
echo [2/2] Starting Sanity Studio...
cd studio
start /b cmd /c "npm run dev"

:: Wait a few seconds for servers to warm up
echo Waiting for servers to be ready...
timeout /t 5 /nobreak > nul

:: Open the browser
echo Opening Terrivo Admin Panel...
start http://localhost:3333/

echo ==========================================
echo    ✅ READY! KEEP THIS WINDOW OPEN ✅
echo ==========================================
pause
