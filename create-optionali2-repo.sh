#!/bin/bash
# Script to create Optionali 2 GitHub repository

echo "🚀 Creating Optionali 2 Repository Setup"
echo "========================================"
echo ""

# Instructions for manual GitHub repo creation
cat << 'EOF'
Since GitHub CLI is not available, please follow these steps:

📝 STEP 1: Create Repository on GitHub
---------------------------------------
1. Go to: https://github.com/new
2. Repository name: optionali-2
3. Description: "Optionali 2 - Advanced Options Trading Platform"
4. Visibility: Choose Public or Private
5. ✅ Initialize with README: NO (we'll push our own)
6. Click "Create repository"

📝 STEP 2: Get Your Repository URL
-----------------------------------
After creation, GitHub will show you the repository URL:
   https://github.com/YOUR_USERNAME/optionali-2.git

Copy this URL for the next step.

📝 STEP 3: Run the Setup Commands
----------------------------------
Once you have the repository URL, run these commands:

EOF

# Create the setup commands
cat << 'EOF'
# Navigate to a new directory for Optionali 2
mkdir -p ~/optionali-2
cd ~/optionali-2

# Initialize git repository
git init
git branch -M main

# Copy BMAD framework from claude-mcp-setup
cp -r /home/user/claude-mcp-setup/.bmad .

# Copy the workflow status file
mkdir -p docs
cp /home/user/claude-mcp-setup/docs/bmm-workflow-status.yaml docs/

# Create initial README
cat > README.md << 'READMEEOF'
# Optionali 2 - Advanced Options Trading Platform

An intelligent options trading system built with BMAD Method for systematic development.

## Project Status

🎯 **Phase:** Discovery & Planning
📋 **Track:** BMad Method (Greenfield)
🚀 **Stage:** Feature Planning & Architecture

## Development Approach

This project follows the BMAD Method with:
- **Discovery Phase:** Brainstorming, Research, Product Brief
- **Planning Phase:** PRD, UX Design
- **Solutioning Phase:** Architecture, Epics & Stories, Test Design
- **Implementation Phase:** Sprint-based development

## Workflow Progress

See `docs/bmm-workflow-status.yaml` for current workflow status.

## Getting Started

This project uses BMAD Method for AI-assisted development. The `.bmad/` directory contains all agents and workflows.

---
*Built with [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) v6.0.0-alpha.13*
READMEEOF

# Create .gitignore
cat > .gitignore << 'IGNOREEOF'
# Dependencies
node_modules/
venv/
__pycache__/

# Environment
.env
.env.local
*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build outputs
dist/
build/
*.pyc
*.pyo
IGNOREEOF

# Initial commit
git add .
git commit -m "Initial commit: Setup Optionali 2 with BMAD Method framework

- Add BMAD Method v6.0.0-alpha.13
- Initialize workflow tracking (greenfield)
- Configure discovery workflows (brainstorm, research, product brief)
- Ready for feature planning and architecture"

# Add remote (YOU'LL NEED TO REPLACE WITH YOUR ACTUAL REPO URL)
echo ""
echo "⚠️  IMPORTANT: Replace YOUR_USERNAME with your actual GitHub username:"
echo ""
echo "git remote add origin https://github.com/YOUR_USERNAME/optionali-2.git"
echo "git push -u origin main"
echo ""

EOF

echo ""
echo "✅ Instructions ready!"
echo ""
echo "Would you like me to:"
echo "1. Show you the GitHub repo creation URL"
echo "2. Wait for you to create the repo and provide the URL"
echo "3. Something else?"
