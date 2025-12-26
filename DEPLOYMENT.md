# Deployment Guide for Vercel

## Step 1: Commit and Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Prepare for Vercel deployment - add folder structure and improve UI"

# Push to GitHub
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **"Deploy"**

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (first time will ask questions)
vercel

# Deploy to production
vercel --prod
```

## Step 3: Verify Deployment

After deployment, Vercel will provide you with:
- A production URL (e.g., `your-app.vercel.app`)
- Automatic HTTPS
- Global CDN

## Build Configuration

The `vercel.json` file is already configured with:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: `vite`
- SPA routing: All routes redirect to `index.html`

## Environment Variables

**No environment variables needed!** The API key is stored securely in the browser's localStorage.

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Show build logs and deployment status

## Troubleshooting

### Build Fails
- Check that `package.json` has correct build script
- Verify all dependencies are listed in `package.json`
- Check Vercel build logs for errors

### Routing Issues
- The `vercel.json` already includes SPA routing configuration
- All routes will redirect to `index.html` for client-side routing

### Font Loading Issues
- Fonts are loaded via Google Fonts CDN
- Should work automatically in production

## Next Steps

1. ✅ Commit and push to GitHub
2. ✅ Deploy to Vercel
3. ✅ Test the deployed app
4. ✅ Share your live URL!

