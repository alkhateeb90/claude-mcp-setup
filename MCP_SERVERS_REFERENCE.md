# MCP Servers Reference

This document provides detailed information about each MCP server included in this setup.

## GitHub MCP Server

**Package**: `@modelcontextprotocol/server-github`

### What It Does
Allows Claude to interact with GitHub repositories, including:
- Listing repositories
- Reading file contents
- Creating/updating files
- Managing issues and pull requests
- Searching code

### Configuration
```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
    }
  }
}
```

### Required Permissions
- `repo` - Full control of private repositories
- `read:org` - Read org and team membership
- `read:user` - Read user profile data

### Example Use Cases
- "List all my GitHub repositories"
- "Show me the README from my project-name repository"
- "Create a new issue in my repo about [topic]"
- "Search for files containing 'function' in my repositories"

---

## Filesystem MCP Server

**Package**: `@modelcontextprotocol/server-filesystem`

### What It Does
Provides Claude with access to read and write files on your local filesystem within specified directories.

### Configuration
```json
{
  "filesystem": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/path/to/allowed/directory1",
      "/path/to/allowed/directory2"
    ]
  }
}
```

### Security Notes
- Only directories explicitly listed in `args` are accessible
- Claude cannot access files outside these directories
- Be careful about granting access to sensitive directories

### Example Use Cases
- "Read the file at ~/Documents/notes.txt"
- "Create a new file called todo.md in my Documents folder"
- "List all Python files in my Projects directory"
- "Update the README in my project folder"

---

## Fetch MCP Server

**Package**: `@modelcontextprotocol/server-fetch`

### What It Does
Allows Claude to fetch and read content from websites and web APIs.

### Configuration
```json
{
  "fetch": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-fetch"]
  }
}
```

### Capabilities
- Fetch HTML content from websites
- Make HTTP GET requests
- Read web pages for information
- Access public APIs

### Limitations
- Some websites may block automated requests
- Cannot bypass authentication or paywalls
- Respects robots.txt and rate limits

### Example Use Cases
- "Fetch the content from https://example.com"
- "What's the latest news from [website URL]?"
- "Get the documentation from [URL]"
- "Read the article at [URL] and summarize it"

---

## SQLite MCP Server

**Package**: `@modelcontextprotocol/server-sqlite`

### What It Does
Enables Claude to query SQLite databases on your local system.

### Configuration
```json
{
  "sqlite": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-sqlite",
      "--db-path",
      "/path/to/database/directory"
    ]
  }
}
```

### Capabilities
- Execute SELECT queries
- List tables and schemas
- Analyze database structure
- Read-only access (for safety)

### Security Notes
- Only databases in the specified directory are accessible
- By default, only read operations are allowed
- Sensitive data in databases will be visible to Claude

### Example Use Cases
- "Show me the schema of my database"
- "Query the users table in my app.db"
- "How many records are in the orders table?"
- "Find all entries where status is 'pending'"

---

## Additional MCP Servers

There are many other MCP servers available. Here are some popular ones you might want to add:

### Memory MCP Server
- **Package**: `@modelcontextprotocol/server-memory`
- **Purpose**: Gives Claude persistent memory across conversations
- **Use Case**: Remember preferences, context, and previous discussions

### Brave Search MCP Server
- **Package**: `@modelcontextprotocol/server-brave-search`
- **Purpose**: Web search capabilities
- **Use Case**: Search the web for current information
- **Requires**: Brave Search API key

### Puppeteer MCP Server
- **Package**: `@modelcontextprotocol/server-puppeteer`
- **Purpose**: Browser automation
- **Use Case**: Interact with websites, fill forms, take screenshots

### PostgreSQL MCP Server
- **Package**: `@modelcontextprotocol/server-postgres`
- **Purpose**: Query PostgreSQL databases
- **Use Case**: Work with PostgreSQL databases

### Google Drive MCP Server
- **Package**: `@modelcontextprotocol/server-gdrive`
- **Purpose**: Access Google Drive files
- **Use Case**: Read and manage Google Drive documents
- **Requires**: Google API credentials

## Installing Additional Servers

To add more MCP servers:

1. **Install the package**:
   ```bash
   npm install -g @modelcontextprotocol/server-[name]
   ```

2. **Add to configuration**:
   ```json
   {
     "mcpServers": {
       "server-name": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-[name]"]
       }
     }
   }
   ```

3. **Restart Claude Desktop**

## Finding More Servers

- Official MCP Servers: https://github.com/modelcontextprotocol/servers
- Community Servers: Search npm for "mcp-server"
- Documentation: https://modelcontextprotocol.io/

## Best Practices

1. **Start Small**: Begin with a few servers and add more as needed
2. **Security First**: Only grant access to directories and data you trust
3. **Test Individually**: Add one server at a time to troubleshoot issues
4. **Keep Updated**: Regularly update MCP servers with `npm update -g`
5. **Monitor Usage**: Be aware of what data Claude can access

## Performance Tips

- Too many MCP servers can slow down Claude Desktop startup
- Disable servers you're not actively using
- Keep Node.js and npm updated for best performance
