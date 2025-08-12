# AI Resume Analyzer - Deployment Guide

## 🚀 Deploying to GitHub + Render

### Prerequisites
- GitHub account
- Render account (free tier available)

## Step 1: Prepare for GitHub

### 1.1 Initialize Git Repository
```bash
cd ai_resume_analyzer
git init
git add .
git commit -m "Initial commit: AI Resume Analyzer"
```

### 1.2 Create GitHub Repository
1. Go to GitHub and create a new repository named `ai-resume-analyzer`
2. Don't initialize with README (we already have files)
3. Copy the repository URL

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-resume-analyzer.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Render

### 2.1 Create Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ai-resume-analyzer-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2.2 Set Environment Variables (CRITICAL)
In Render dashboard, add these environment variables:
```
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.onrender.com
```

**⚠️ Important**: 
- Do NOT set PORT manually - Render sets this automatically
- FRONTEND_URL must match your exact frontend URL (set after Step 3)

### 2.3 Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Copy the backend URL (e.g., `https://ai-resume-analyzer-backend.onrender.com`)

## Step 3: Deploy Frontend to Render

### 3.1 Create Static Site
1. In Render dashboard, click "New" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `ai-resume-analyzer-frontend`
   - **Root Directory**: `ai-resume-analyzer-ui`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 3.2 Set Environment Variables
Add this environment variable:
```
VITE_API_URL=https://your-backend-url.onrender.com
```
(Replace with your actual backend URL from Step 2.3)

### 3.3 Deploy
- Click "Create Static Site"
- Wait for deployment to complete
- Copy the frontend URL

## Step 4: Update Backend CORS Configuration

**CRITICAL STEP**: After both services are deployed:

1. Go to your backend service in Render
2. Update the `FRONTEND_URL` environment variable with your actual frontend URL:
```
FRONTEND_URL=https://your-actual-frontend-url.onrender.com
```
3. Click "Manual Deploy" to redeploy the backend service

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Try analyzing a resume
3. Check that all features work:
   - Resume analysis
   - PDF export
   - Navigation links
   - Responsive design

## 🔧 Troubleshooting

### Common Issues:

**CORS Errors:**
- Ensure FRONTEND_URL in backend exactly matches your frontend URL
- Check that both URLs use HTTPS
- Verify no trailing slashes in URLs

**API Connection Failed:**
- Verify VITE_API_URL in frontend matches your backend URL
- Check backend logs in Render dashboard
- Ensure both services are deployed and running

**Build Failures:**
- Check Node.js version compatibility (18+ recommended)
- Verify all dependencies are in package.json
- Check build logs in Render dashboard

### Environment Variables Summary:

**Backend Environment Variables:**
```
NODE_ENV=production
FRONTEND_URL=https://your-actual-frontend-url.onrender.com
```

**Frontend Environment Variables:**
```
VITE_API_URL=https://your-actual-backend-url.onrender.com
```

## 🎯 Production Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] CORS configured with correct frontend URL
- [ ] Environment variables set correctly
- [ ] API endpoints responding (test /api/health)
- [ ] Resume analysis working
- [ ] PDF export functional
- [ ] Mobile responsive
- [ ] All sections accessible
- [ ] Error handling working

## 📋 Render-Specific Best Practices

### Backend Configuration:
- ✅ Uses `process.env.PORT` (Render sets this automatically)
- ✅ CORS configured with environment variable
- ✅ Proper error handling and logging
- ✅ Health check endpoint available

### Frontend Configuration:
- ✅ Uses Vite environment variables (`VITE_` prefix)
- ✅ Build command includes dependency installation
- ✅ Correct publish directory (`dist`)

### Security:
- ✅ Rate limiting enabled
- ✅ Helmet security headers
- ✅ CORS restricted to specific origins
- ✅ Input validation and sanitization

## 📱 Custom Domain (Optional)

To use a custom domain:
1. In Render dashboard, go to your static site
2. Click "Settings" → "Custom Domains"
3. Add your domain and configure DNS
4. Update CORS settings with new domain in backend

## 🚨 Critical Notes

1. **Environment Variables**: Must be set correctly or deployment will fail
2. **CORS Configuration**: Backend will reject frontend requests if FRONTEND_URL is wrong
3. **Build Commands**: Must include `npm install` for dependency installation
4. **Port Configuration**: Never hardcode ports - use `process.env.PORT`

Your AI Resume Analyzer will be live and fully functional! 🎉

## 📞 Support

If you encounter issues:
1. Check Render service logs in the dashboard
2. Verify environment variables are set correctly
3. Test API endpoints directly (e.g., `/api/health`)
4. Ensure both services are in "Live" status