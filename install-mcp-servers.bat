@echo off
REM MCP Servers Installation Script for Windows
REM This script installs all MCP servers globally using npm

echo ==========================================
echo Installing MCP Servers for Claude Desktop
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo [OK] npm is installed
npm --version
echo.

REM Install MCP Servers
echo Installing MCP servers...
echo.

echo 1/4 Installing GitHub MCP Server...
call npm install -g @modelcontextprotocol/server-github
echo.

echo 2/4 Installing Filesystem MCP Server...
call npm install -g @modelcontextprotocol/server-filesystem
echo.

echo 3/4 Installing Fetch MCP Server...
call npm install -g @modelcontextprotocol/server-fetch
echo.

echo 4/4 Installing SQLite MCP Server...
call npm install -g @modelcontextprotocol/server-sqlite
echo.

echo ==========================================
echo [OK] All MCP servers installed successfully!
echo ==========================================
echo.
echo Next steps:
echo 1. Create a GitHub Personal Access Token
echo 2. Copy claude_desktop_config_windows.json to:
echo    %%APPDATA%%\Claude\claude_desktop_config.json
echo 3. Update the configuration with your GitHub token and paths
echo 4. Restart Claude Desktop
echo.
echo See README.md for detailed instructions.
echo.
pause
