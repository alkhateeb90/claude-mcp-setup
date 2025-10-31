#!/bin/bash

# MCP Servers Installation Script
# This script installs all MCP servers globally using npm

echo "=========================================="
echo "Installing MCP Servers for Claude Desktop"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install MCP Servers
echo "Installing MCP servers..."
echo ""

echo "1/4 Installing GitHub MCP Server..."
npm install -g @modelcontextprotocol/server-github
echo ""

echo "2/4 Installing Filesystem MCP Server..."
npm install -g @modelcontextprotocol/server-filesystem
echo ""

echo "3/4 Installing Fetch MCP Server..."
npm install -g @modelcontextprotocol/server-fetch
echo ""

echo "4/4 Installing SQLite MCP Server..."
npm install -g @modelcontextprotocol/server-sqlite
echo ""

echo "=========================================="
echo "✓ All MCP servers installed successfully!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Create a GitHub Personal Access Token"
echo "2. Copy the configuration file to Claude Desktop config location"
echo "3. Update the configuration with your GitHub token and paths"
echo "4. Restart Claude Desktop"
echo ""
echo "See README.md for detailed instructions."
