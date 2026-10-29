@echo off
title SPS-CARBON - apercu local
cd /d "%~dp0"
where npm >nul 2>nul || (echo Node.js introuvable. Installez Node.js 20 ou plus sur https://nodejs.org puis relancez. & pause & exit /b 1)
if not exist node_modules\.bin\next.cmd (
  echo Installation des dependances, une seule fois...
  call npm.cmd install || (echo L'installation a echoue. & pause & exit /b 1)
)
rem Ferme un ancien apercu encore ouvert sur le port 3000.
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do taskkill /pid %%p /f >nul 2>nul
echo Demarrage du site sur http://127.0.0.1:3000 ... gardez cette fenetre ouverte.
echo Le navigateur s'ouvrira tout seul des que le site sera pret.
start "" /min powershell -NoProfile -Command "for($i=0;$i -lt 60;$i++){try{Invoke-WebRequest -UseBasicParsing http://127.0.0.1:3000 -TimeoutSec 90 | Out-Null; Start-Process 'http://127.0.0.1:3000'; break}catch{Start-Sleep 2}}"
powershell -NoProfile -ExecutionPolicy Bypass -Command "Remove-Item apercu.log -ErrorAction SilentlyContinue; npm.cmd run dev 2>&1 | ForEach-Object { $_; Add-Content -Path apercu.log -Value $_ -ErrorAction SilentlyContinue }"
pause
