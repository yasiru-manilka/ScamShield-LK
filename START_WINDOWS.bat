@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. You can open index.html in your browser instead.
  pause
  exit /b 1
)
start "" http://localhost:5173
node scripts\server.cjs
pause
