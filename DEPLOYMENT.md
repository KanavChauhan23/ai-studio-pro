# 🚀 AI Studio Pro - Complete Deployment Guide

## All Phases (1-4) - TODAY!

**Total Time:** 3-4 hours
**Difficulty:** Medium
**Result:** Full-stack production app LIVE!

---

## 📋 PHASE 1: BACKEND SETUP (45 min)

### Step 1: Get API Keys (15 min)

#### Groq API (FREE - Required)
1. Visit: https://console.groq.com/
2. Sign up with email
3. Navigate to "API Keys"
4. Click "Create API Key"
5. **Copy key** (starts with `gsk_`)

#### Replicate API (Required for images)
1. Visit: https://replicate.com/
2. Sign up
3. Go to Account → API Tokens
4. **Copy token** (starts with `r8_`)

### Step 2: PostgreSQL Setup (10 min)

**Mac:**
```bash
brew install postgresql@15
brew services start postgresql@15
createdb ai_studio_pro
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
sudo -u postgres createdb ai_studio_pro
```

**Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Install with default settings
3. Open SQL Shell (psql)
4. Run: `CREATE DATABASE ai_studio_pro;`

### Step 3: Backend Installation (10 min)

```bash
cd ai-studio-pro/backend

# Create virtual environment
python3 -m venv venv

# Activate it
# Mac/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Step 4: Configure Environment (5 min)

```bash
# Copy example env
cp .env.example .env

# Edit .env
nano .env  # or use VS Code
```

Update with your keys:
```env
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/ai_studio_pro
SECRET_KEY=run-this-command-to-generate-python-c-import-secrets-print-secrets-token-urlsafe-32
GROQ_API_KEY=gsk_your_key_here
REPLICATE_API_KEY=r8_your_key_here
```

### Step 5: Run Backend (5 min)

```bash
# Start the server
uvicorn app.main:app --reload

# Should see:
# INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Test:** Open http://localhost:8000/docs

✅ **Phase 1 Complete!**

---

## 📋 PHASE 2: FRONTEND SETUP (45 min)

### Step 1: Install Node.js (if needed) (5 min)

**Check version:**
```bash
node --version  # Should be 18+
```

**Install if needed:**
- Mac: `brew install node`
- Linux: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs`
- Windows: Download from https://nodejs.org/

### Step 2: Frontend Installation (10 min)

```bash
cd ai-studio-pro/frontend

# Install dependencies
npm install

# This takes 5-10 minutes
```

### Step 3: Configure Environment (2 min)

```bash
# Copy example env
cp .env.local.example .env.local

# Edit if needed (default is fine for local)
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

### Step 4: Run Frontend (3 min)

```bash
# Start development server
npm run dev

# Should see:
# ✓ Ready on http://localhost:3000
```

### Step 5: Test Everything (25 min)

**Open:** http://localhost:3000

**Test Flow:**
1. ✅ Home page loads
2. ✅ Click "Sign Up"
3. ✅ Register new account:
   - Email: test@example.com
   - Username: testuser
   - Password: test123
4. ✅ Login with credentials
5. ✅ Go to Dashboard
6. ✅ Test Text Generator:
   - Prompt: "Write about AI"
   - Generate content
7. ✅ Test Image Generator:
   - Prompt: "A sunset over mountains"
   - Wait 30 seconds
   - Image appears!
8. ✅ Test Code Generator:
   - Prompt: "Sort array function"
   - Language: Python
   - Generate code
9. ✅ Check Dashboard history

✅ **Phase 2 Complete!**

---

## 📋 PHASE 3: ADVANCED FEATURES (30 min)

### Features Already Included ✅

1. **User Authentication**
   - JWT tokens
   - Secure passwords
   - Session management

2. **Content Management**
   - Save all generations
   - View history
   - Delete content

3. **Multi-Modal Generation**
   - Text (blogs, social, emails)
   - Images (multiple styles)
   - Code (multiple languages)

4. **Professional UI**
   - Responsive design
   - Beautiful gradients
   - Smooth animations
   - Loading states

### Optional Enhancements (If time)

**Add Usage Analytics:**
```typescript
// In dashboard, add stats
const [stats, setStats] = useState({
  total: 0,
  text: 0,
  image: 0,
  code: 0
});
```

**Add Dark Mode:**
```typescript
// Add theme toggle
const [theme, setTheme] = useState('light');
```

✅ **Phase 3 Complete!**

---

## 📋 PHASE 4: DEPLOYMENT (60-90 min)

### Option A: Quick Deploy (Railway + Vercel)

#### Part 1: Deploy Backend to Railway (30 min)

1. **Create Railway Account**
   - Visit: https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your `ai-studio-pro` repo

3. **Configure Backend**
   - Root directory: `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. **Add PostgreSQL**
   - Click "New"
   - Choose "Database"
   - Select "PostgreSQL"
   - Railway auto-creates DATABASE_URL

5. **Add Environment Variables**
   ```
   SECRET_KEY=your-secret-key-min-32-chars
   GROQ_API_KEY=gsk_your_key
   REPLICATE_API_KEY=r8_your_key
   CORS_ORIGINS=["https://your-frontend.vercel.app"]
   ```

6. **Deploy!**
   - Railway automatically deploys
   - Wait 5 minutes
   - Get backend URL: `https://your-app.railway.app`

#### Part 2: Deploy Frontend to Vercel (20 min)

1. **Create Vercel Account**
   - Visit: https://vercel.com/
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import `ai-studio-pro` repo
   - Framework: Next.js
   - Root directory: `frontend`

3. **Configure Environment**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app
   ```

4. **Deploy!**
   - Click "Deploy"
   - Wait 3 minutes
   - Get frontend URL: `https://your-app.vercel.app`

5. **Update Backend CORS**
   - Go back to Railway
   - Update CORS_ORIGINS with Vercel URL
   - Redeploy

#### Part 3: Test Production (10 min)

1. Visit your Vercel URL
2. Register new account
3. Test all generators
4. Verify everything works!

✅ **Phase 4 Complete!**

---

### Option B: Alternative Deployment (Render + Netlify)

**Backend → Render:**
- Similar to Railway
- Free tier available
- https://render.com/

**Frontend → Netlify:**
- Similar to Vercel
- Free tier available
- https://netlify.com/

---

## 🎯 POST-DEPLOYMENT CHECKLIST

### Immediate (Today)

- [ ] Both backend and frontend deployed
- [ ] All generators working
- [ ] User registration working
- [ ] Content saving to database
- [ ] Take screenshots

### Tomorrow

- [ ] Upload code to GitHub
- [ ] Add screenshots to README
- [ ] Update LinkedIn profile
- [ ] Share on Twitter/LinkedIn

### This Week

- [ ] Add custom domain (optional)
- [ ] Set up monitoring
- [ ] Add analytics
- [ ] Start applying to jobs!

---

## 💰 DEPLOYMENT COSTS

### Development (Free)
- Groq API: FREE
- Local PostgreSQL: FREE
- Local development: FREE

### Production

**Option 1: Free Tier (Recommended to start)**
- Railway: FREE (500 hours/month)
- Vercel: FREE
- PostgreSQL on Railway: FREE (limited)
- **Total: $0/month**

**Option 2: Paid (For scale)**
- Railway: $5-10/month
- Vercel: FREE
- PostgreSQL: Included
- **Total: $5-10/month**

---

## 🐛 TROUBLESHOOTING

### Backend Issues

**Database connection error:**
```bash
# Check PostgreSQL is running
# Mac:
brew services list
# Linux:
sudo service postgresql status

# Test connection
psql ai_studio_pro
```

**Module not found:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

**Port already in use:**
```bash
# Use different port
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**Dependencies error:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API connection error:**
```bash
# Check .env.local
cat .env.local
# Should point to http://localhost:8000
```

**Build error:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Deployment Issues

**Railway build fails:**
- Check Python version (should be 3.9+)
- Check requirements.txt syntax
- Check environment variables

**Vercel build fails:**
- Check Node version (should be 18+)
- Check package.json syntax
- Check environment variables

**CORS errors in production:**
- Update backend CORS_ORIGINS
- Include frontend URL
- Redeploy backend

---

## 📊 SUCCESS METRICS

After deployment, you should have:

✅ **Functional App**
- Users can register/login
- All 3 generators work
- Content saves to database
- History displays correctly

✅ **Production URLs**
- Backend API live
- Frontend app live
- Both URLs working
- HTTPS enabled

✅ **Portfolio Ready**
- Code on GitHub
- Live demo available
- Screenshots taken
- README updated

---

## 🚀 YOU'RE DONE!

### What You Built Today:

1. **Full-Stack App**
   - Python FastAPI backend
   - Next.js TypeScript frontend
   - PostgreSQL database

2. **Multiple AI Integrations**
   - Groq for text/code
   - Replicate for images
   - Professional API design

3. **Production Deployment**
   - Backend on Railway
   - Frontend on Vercel
   - Database hosted

4. **Professional Features**
   - User authentication
   - Content management
   - Beautiful UI/UX

### Portfolio Value:

**Skills Demonstrated:**
- Full-stack development
- Multi-language (Python + TypeScript)
- Modern frameworks
- Database design
- API development
- AI integration
- DevOps/Deployment

**Expected Salary Impact:**
₹15-25 LPA with this project! 🚀

---

## 📞 FINAL STEPS

1. **GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AI Studio Pro"
   git branch -M main
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **LinkedIn Post:**
   ```
   🚀 Excited to share my latest project: AI Studio Pro!

   A full-stack multi-modal AI content creation platform built with:
   • Python FastAPI
   • Next.js 14 + TypeScript
   • PostgreSQL
   • Groq AI & Replicate

   Features:
   ✅ Text generation
   ✅ AI image creation
   ✅ Code generation
   ✅ User authentication
   ✅ Content management

   Live Demo: [your-url]
   Code: [github-url]

   #AI #FullStack #WebDevelopment #MachineLearning
   ```

3. **Update Resume:**
   Add this project to your resume with all the tech stack!

---

**CONGRATULATIONS! YOU'VE BUILT A COMPLETE PRODUCTION AI PLATFORM!** 🎉🎉🎉

**Now go get that job!** 💼
