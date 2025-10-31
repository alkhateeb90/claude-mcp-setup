# Quick Start Guide

This is a simplified guide to get MCP servers running with Claude Desktop as quickly as possible.

## 5-Minute Setup

### 1. Install MCP Servers

**On Windows:**
```bash
# Double-click install-mcp-servers.bat
# OR run in Command Prompt:
install-mcp-servers.bat
```

**On macOS/Linux:**
```bash
# Run in Terminal:
./install-mcp-servers.sh
```

### 2. Get GitHub Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Select scopes: `repo`, `read:org`, `read:user`
4. Copy the token

### 3. Configure Claude Desktop

**Find your config file:**

- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Copy the right template:**

- Windows users: Use `claude_desktop_config_windows.json`
- macOS/Linux users: Use `claude_desktop_config.json`

**Edit these values:**

1. Replace `YOUR_GITHUB_TOKEN_HERE` with your actual token
2. Replace `YOUR_USERNAME` with your actual username
3. Update paths to directories you want Claude to access

### 4. Restart Claude Desktop

**Completely quit** Claude Desktop (not just close the window) and reopen it.

## Test It Out

Try asking Claude:

- "List my GitHub repositories"
- "Read the file at [path to a file in your allowed directories]"
- "Fetch the content from https://example.com"

## Need Help?

See the full [README.md](README.md) for detailed instructions and troubleshooting.

## Common Issues

**MCP servers not showing up?**
- Make sure you completely quit and restarted Claude Desktop
- Check that your JSON config file has no syntax errors

**GitHub not working?**
- Verify your token is correct
- Make sure the token has the right permissions

**Filesystem access denied?**
- Check that the paths in your config exist
- Ensure you have read/write permissions for those directories
