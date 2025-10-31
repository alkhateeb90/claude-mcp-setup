# Troubleshooting Guide

This guide covers common issues when setting up MCP servers with Claude Desktop.

## MCP Servers Not Appearing

### Symptom
After configuration, you don't see any MCP server indicators in Claude Desktop.

### Solutions

1. **Restart Claude Desktop Properly**
   - Don't just close the window
   - Completely quit the application:
     - **Windows**: Right-click system tray icon → Exit
     - **macOS**: Cmd+Q or Claude → Quit Claude
     - **Linux**: File → Quit
   - Wait a few seconds, then reopen

2. **Check Configuration File Location**
   - Verify you edited the correct file:
     - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
     - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
     - **Linux**: `~/.config/Claude/claude_desktop_config.json`
   - The directory might not exist - create it if needed

3. **Validate JSON Syntax**
   - Use a JSON validator: https://jsonlint.com/
   - Common mistakes:
     - Trailing commas
     - Missing quotes
     - Incorrect escape sequences in paths

4. **Check Node.js Installation**
   ```bash
   node --version
   npm --version
   ```
   - Should be version 18 or higher
   - If not installed, download from https://nodejs.org/

## GitHub MCP Server Issues

### Symptom
GitHub server shows up but doesn't work or shows authentication errors.

### Solutions

1. **Verify Token**
   - Make sure you replaced `YOUR_GITHUB_TOKEN_HERE` with your actual token
   - Token should have no spaces or extra characters
   - Check token hasn't expired: https://github.com/settings/tokens

2. **Check Token Permissions**
   - Token needs these scopes:
     - `repo` - Full control of private repositories
     - `read:org` - Read org and team membership
     - `read:user` - Read user profile data
   - Regenerate token if permissions are wrong

3. **Test Token Manually**
   ```bash
   curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user
   ```
   - Should return your user information
   - If not, token is invalid

## Filesystem MCP Server Issues

### Symptom
Filesystem server doesn't work or shows permission errors.

### Solutions

1. **Verify Paths Exist**
   - Check that directories in config actually exist
   - Create them if they don't:
     ```bash
     # macOS/Linux
     mkdir -p ~/Documents ~/Projects
     
     # Windows
     mkdir C:\Users\YOUR_USERNAME\Documents
     mkdir C:\Users\YOUR_USERNAME\Projects
     ```

2. **Check Path Format**
   - **Windows**: Use double backslashes `C:\\Users\\...`
   - **macOS/Linux**: Use forward slashes `/Users/...`

3. **Verify Permissions**
   - Make sure you have read/write access to the directories
   - Try accessing them manually first

4. **Use Absolute Paths**
   - Don't use `~` or environment variables
   - Use full paths like `/Users/john/Documents`

## Fetch MCP Server Issues

### Symptom
Fetch server doesn't retrieve web content.

### Solutions

1. **Check Internet Connection**
   - Verify you can access websites normally

2. **Test with Simple URL**
   - Try a simple site first: `https://example.com`
   - Some sites may block automated requests

3. **Firewall/Proxy Issues**
   - Check if your firewall is blocking Node.js
   - If behind a proxy, you may need additional configuration

## SQLite MCP Server Issues

### Symptom
SQLite server doesn't work or can't find databases.

### Solutions

1. **Verify Database Path**
   - Check that the `--db-path` points to an existing directory
   - Create the directory if it doesn't exist

2. **Check Database Files**
   - Ensure `.db` or `.sqlite` files exist in the specified path
   - Test opening them with a SQLite client

3. **Permissions**
   - Verify read/write access to database files

## Installation Issues

### npm Install Fails

1. **Permission Errors**
   - **macOS/Linux**: Try with sudo:
     ```bash
     sudo npm install -g @modelcontextprotocol/server-github
     ```
   - **Windows**: Run Command Prompt as Administrator

2. **Network Issues**
   - Check internet connection
   - Try clearing npm cache:
     ```bash
     npm cache clean --force
     ```

3. **Node Version Too Old**
   - Update Node.js to version 18 or higher
   - Download from https://nodejs.org/

### npx Command Not Found

1. **Update npm**
   ```bash
   npm install -g npm@latest
   ```

2. **Reinstall Node.js**
   - Download latest version from https://nodejs.org/

## Claude Desktop Logs

If you're still having issues, check Claude Desktop logs:

- **Windows**: `%APPDATA%\Claude\logs\`
- **macOS**: `~/Library/Logs/Claude/`
- **Linux**: `~/.config/Claude/logs/`

Look for error messages related to MCP servers.

## Still Need Help?

1. Check the [MCP Documentation](https://modelcontextprotocol.io/)
2. Review the [Claude Desktop Documentation](https://claude.ai/docs)
3. Make sure all prerequisites are installed
4. Try removing and reinstalling MCP servers

## Reporting Issues

When reporting issues, include:
- Your operating system and version
- Node.js version (`node --version`)
- Claude Desktop version
- The exact error message
- Your configuration file (with token removed)
