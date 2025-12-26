# EchoForge

A professional job application assistant powered by Claude AI, helping you craft tailored responses for job applications.

## Features

- 📋 **Information Tab**: Get answers about your portfolio, skills, and experience
- ❓ **Questions Tab**: Craft professional responses for job application questions
- 🎯 **Job Description Integration**: Automatically tailor responses based on job descriptions
- 💬 **Chat Interface**: Clean, modern UI with markdown support
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

- React 18
- Vite
- Claude API (Anthropic)
- React Markdown

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Claude API Key from [Anthropic](https://console.anthropic.com/)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**:
   ```bash
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit"
   
   # Create a new repository on GitHub and push
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

## Environment Variables

No environment variables needed! The API key is stored locally in the browser's localStorage for security.

## Project Structure

```
src/
├── components/     # React components
├── data/          # Portfolio data
├── hooks/          # Custom React hooks
├── styles/         # CSS files
├── utils/          # Utility functions and constants
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Build Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite

## License

MIT

