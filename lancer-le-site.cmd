@echo off
title SPS-CARBON - apercu local
cd /d "%~dp0"
where npm >nul 2>nul || (echo Node.js introuvable. Installez Node.js 20 ou plus sur https://nodejs.org puis relancez. & pause & exit /b 1)
echo Demarrage du site sur http://127.0.0.1:3000 ... gardez cette fenetre ouverte.
start "" cmd /c "timeout /t 15 >nul && start http://127.0.0.1:3000"
powershell -NoProfile -ExecutionPolicy Bypass -Command "npm.cmd run dev 2>&1 | Tee-Object -FilePath apercu.log"
pause
