@echo off
title SPS-CARBON - verification du build
cd /d "%~dp0"
where npm >nul 2>nul || (echo Node.js introuvable. & pause & exit /b 1)
echo Construction de la version de production (comme sur Vercel)...
echo BUILD_START> build-check.log
call npm.cmd run build >> build-check.log 2>&1
echo BUILD_EXIT=%errorlevel%>> build-check.log
type build-check.log
echo.
echo Termine. Vous pouvez fermer cette fenetre.
timeout /t 20
