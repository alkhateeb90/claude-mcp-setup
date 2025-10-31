# Claude MCP Setup

This repository contains configuration and setup instructions for connecting **Model Context Protocol (MCP)** servers to Claude Desktop.

## What is MCP?

The Model Context Protocol (MCP) is an open protocol that enables Claude Desktop to connect to external data sources and tools. MCP servers provide Claude with additional capabilities like accessing your filesystem, GitHub repositories, databases, and more.

## Available MCP Servers

This setup includes the following MCP servers:

1. **GitHub MCP Server** - Access and manage GitHub repositories
2. **Filesystem MCP Server** - Read and write files on your local computer
3. **Fetch MCP Server** - Browse and fetch web content
4. **SQLite MCP Server** - Query SQLite databases

## Prerequisites

Before setting up MCP servers, ensure you have:

- **Claude Desktop** installed ([Download here](https://claude.ai/download))
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **Git** installed on your system
- A **GitHub Personal Access Token** (for GitHub MCP server)

## Installation Instructions

### Step 1: Install Node.js and npm

Make sure you have Node.js installed:

```bash
node --version
npm --version
```

If not installed, download from [nodejs.org](https://nodejs.org/).

### Step 2: Install MCP Servers

The MCP servers will be installed globally using npm. Run the following commands:

```bash
# Install GitHub MCP Server
npm install -g @modelcontextprotocol/server-github

# Install Filesystem MCP Server
npm install -g @modelcontextprotocol/server-filesystem

# Install Fetch MCP Server
npm install -g @modelcontextprotocol/server-fetch

# Install SQLite MCP Server
npm install -g @modelcontextprotocol/server-sqlite
```

### Step 3: Create GitHub Personal Access Token

For the GitHub MCP server to work, you need a GitHub Personal Access Token:

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a descriptive name like "Claude MCP Server"
4. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `read:org` (Read org and team membership)
   - `read:user` (Read user profile data)
5. Click **"Generate token"**
6. **Copy the token** - you won't be able to see it again!

### Step 4: Configure Claude Desktop

The configuration file location depends on your operating system:

- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

Copy the configuration from `claude_desktop_config.json` in this repository and paste it into your Claude Desktop configuration file.

**Important**: Replace `YOUR_GITHUB_TOKEN_HERE` with your actual GitHub Personal Access Token.

### Step 5: Customize Filesystem Paths

In the configuration file, update the filesystem server's allowed directories to match your needs:

```json
"args": [
  "/Users/YOUR_USERNAME/Documents",
  "/Users/YOUR_USERNAME/Projects"
]
```

Replace these paths with the directories you want Claude to access.

### Step 6: Restart Claude Desktop

After saving the configuration file, **completely quit and restart Claude Desktop** for the changes to take effect.

## Verifying Installation

Once Claude Desktop restarts, you should see MCP server indicators in the interface. You can test the connection by asking Claude to:

- List your GitHub repositories
- Read a file from your allowed directories
- Fetch content from a website
- Query a SQLite database (if you have one)

## Troubleshooting

### MCP Servers Not Showing Up

1. Make sure you've completely quit and restarted Claude Desktop (not just closed the window)
2. Check that the configuration file is in the correct location
3. Verify the JSON syntax is valid (no trailing commas, proper quotes)

### GitHub Token Issues

- Make sure you've replaced `YOUR_GITHUB_TOKEN_HERE` with your actual token
- Verify the token has the correct permissions
- Check that the token hasn't expired

### Permission Errors

- Ensure the paths in the filesystem configuration exist
- Make sure you have read/write permissions for those directories

## Security Notes

- **Never commit your GitHub token to a public repository**
- Keep your `claude_desktop_config.json` file secure
- Only grant filesystem access to directories you trust Claude to modify
- Review the permissions you grant to each MCP server

## Additional Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Claude Desktop Documentation](https://claude.ai/docs)
- [Available MCP Servers](https://github.com/modelcontextprotocol/servers)

## Support

If you encounter issues:

1. Check the Claude Desktop logs
2. Verify all prerequisites are installed
3. Review the troubleshooting section above
4. Consult the official MCP documentation

## License

This configuration is provided as-is for personal use.
