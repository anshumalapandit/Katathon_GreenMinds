@echo off
REM Start Impact Route Analyzer backend server

echo Starting Impact Route Analyzer Assistant Server...
echo.

cd /d "c:\Users\Anshumala\Downloads\cosmos-forge (2)\public\impact-route"

REM Set the OpenWeather API key
set OW_KEY=f4f5a20348dc6c0a0b3fb49989172800

REM Start the server
echo Server starting on http://localhost:3000
echo Make sure your main app is running on http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

node server.js

pause
