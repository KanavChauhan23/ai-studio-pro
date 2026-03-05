# 🚀 AI Studio Pro - Quick Start Guide

## Phase 1: Backend Setup (30 minutes)

### Step 1: Get API Keys (10 min)

#### Groq API Key (FREE - REQUIRED)
1. Go to https://console.groq.com/
2. Sign up with email
3. Go to "API Keys"
4. Click "Create API Key"
5. Copy key (starts with `gsk_...`)

#### Replicate API Key (REQUIRED)
1. Go to https://replicate.com/
2. Sign up
3. Go to Account → API Tokens
4. Copy token

#### PostgreSQL Setup (Local)
```bash
# Install PostgreSQL (if not installed)
# Mac:
brew install postgresql
brew services start postgresql

# Linux:
sudo apt install postgresql
sudo service postgresql start

# Windows: Download installer from postgresql.org
```

Create database:
```bash
createdb ai_studio_pro

# Or using psql:
psql
CREATE DATABASE ai_studio_pro;
\q
```

### Step 2: Backend Installation (10 min)

```bash
# Navigate to backend
cd ai-studio-pro/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Mac/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Configure Environment (5 min)

```bash
# Copy example env file
cp .env.example .env

# Edit .env file
nano .env  # or use your preferred editor
```

Update `.env` with:
```env
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/ai_studio_pro
SECRET_KEY=generate-a-random-32-char-string-here-change-this
GROQ_API_KEY=your-groq-api-key-here
REPLICATE_API_KEY=your-replicate-api-key-here
```

**Generate SECRET_KEY:**
```python
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Step 4: Run Backend (5 min)

```bash
# Start the server
uvicorn app.main:app --reload

# Server will start at: http://localhost:8000
# API Docs at: http://localhost:8000/docs
```

### Step 5: Test API (5 min)

Open browser: http://localhost:8000/docs

#### Test Register:
1. Click on `POST /api/auth/register`
2. Click "Try it out"
3. Enter:
```json
{
  "email": "test@example.com",
  "username": "testuser",
  "password": "testpass123",
  "full_name": "Test User"
}
```
4. Click "Execute"

#### Test Login:
1. Click on `POST /api/auth/login`
2. Enter:
   - username: `testuser`
   - password: `testpass123`
3. Copy the `access_token`

#### Test Text Generation:
1. Click the lock icon 🔒 at the top
2. Enter: `Bearer YOUR_TOKEN`
3. Click on `POST /api/generate/text`
4. Enter:
```json
{
  "prompt": "Write a short blog about AI",
  "content_type": "blog",
  "tone": "professional",
  "length": "short"
}
```
5. Click "Execute"
6. See your generated content! 🎉

---

## Phase 2: Frontend Setup (Coming Next!)

This will be covered in the next phase:
- Next.js 14 setup
- Beautiful UI with Tailwind
- React components
- API integration

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
# Mac:
brew services list
# Linux:
sudo service postgresql status

# Check database exists
psql -l
```

### Import Errors
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Port Already in Use
```bash
# Change port in command
uvicorn app.main:app --reload --port 8001
```

### Groq API Error
- Check API key is correct
- Check internet connection
- Verify key at https://console.groq.com/

---

## ✅ Success Checklist

After setup, you should have:
- [  ] Backend running at http://localhost:8000
- [  ] API docs accessible at http://localhost:8000/docs
- [  ] Can register a user
- [  ] Can login and get token
- [  ] Can generate text content
- [  ] Can generate images
- [  ] Can generate code

---

## 📞 Need Help?

- **Check README.md** in each folder
- **API Documentation:** http://localhost:8000/docs
- **Common Issues:** See troubleshooting above

---

## 🎯 Next Steps

1. ✅ Complete backend setup
2. ⏭️ Build frontend (Phase 2)
3. ⏭️ Add features (Phase 3)
4. ⏭️ Deploy (Phase 4)

---

**You're doing great! Backend is the hard part - you've got this!** 💪
