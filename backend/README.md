# AI Studio Pro - Backend API

FastAPI backend for AI Studio Pro - Multi-Modal Content Creation Platform

## 🚀 Features

- ✅ User Authentication (JWT)
- ✅ Text Generation (Groq AI)
- ✅ Image Generation (Replicate/Stable Diffusion)
- ✅ Code Generation (Groq AI)
- ✅ Voice Generation (Coming Soon)
- ✅ Content History & Management
- ✅ PostgreSQL Database
- ✅ RESTful API
- ✅ Automatic API Documentation

## 🛠️ Tech Stack

- **Framework:** FastAPI
- **Database:** PostgreSQL + SQLAlchemy
- **Authentication:** JWT (python-jose)
- **AI Services:** Groq, Replicate
- **Password Hashing:** bcrypt
- **Validation:** Pydantic

## 📁 Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── routes/
│   │       ├── auth.py          # Authentication endpoints
│   │       └── generate.py      # Content generation endpoints
│   ├── core/
│   │   ├── config.py            # App configuration
│   │   └── security.py          # Security utilities
│   ├── db/
│   │   └── database.py          # Database connection
│   ├── models/
│   │   ├── user.py              # User model
│   │   └── content.py           # Content model
│   ├── schemas/
│   │   ├── user.py              # User schemas
│   │   └── content.py           # Content schemas
│   ├── services/
│   │   ├── groq_service.py      # Groq AI service
│   │   └── replicate_service.py # Replicate service
│   └── main.py                  # FastAPI app
├── requirements.txt
└── .env.example

## 🔧 Setup Instructions

### 1. Prerequisites

- Python 3.9+
- PostgreSQL 12+
- Groq API Key
- Replicate API Key (optional)

### 2. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Setup Database

Create PostgreSQL database:
```sql
CREATE DATABASE ai_studio_pro;
```

### 4. Configure Environment

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

Update `.env` with your credentials:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/ai_studio_pro
SECRET_KEY=your-secret-key-min-32-characters
GROQ_API_KEY=your-groq-api-key
REPLICATE_API_KEY=your-replicate-api-key
```

### 5. Run the Server

```bash
# Development mode
uvicorn app.main:app --reload --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 6. Access API Documentation

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 📚 API Endpoints

### Authentication

```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login (get token)
GET    /api/auth/me          # Get current user
```

### Content Generation

```
POST   /api/generate/text    # Generate text content
POST   /api/generate/image   # Generate images
POST   /api/generate/code    # Generate code
POST   /api/generate/voice   # Generate voice (TTS)
GET    /api/generate/history # Get content history
DELETE /api/generate/content/{id}  # Delete content
```

## 🔑 Getting API Keys

### Groq API Key (FREE)

1. Go to https://console.groq.com/
2. Sign up
3. Create API key
4. Copy key

### Replicate API Key

1. Go to https://replicate.com/
2. Sign up
3. Go to Account Settings
4. Copy API token

## 🧪 Testing the API

### 1. Register User

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "testpassword123",
    "full_name": "Test User"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=testpassword123"
```

### 3. Generate Text (with token)

```bash
curl -X POST http://localhost:8000/api/generate/text \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a blog post about AI",
    "content_type": "blog",
    "tone": "professional",
    "length": "medium"
  }'
```

## 🗄️ Database Models

### User
- id, email, username, hashed_password
- full_name, is_active, is_superuser
- created_at, updated_at
- Relationship: one-to-many with Content

### Content
- id, title, content_type, prompt, result
- metadata, owner_id
- created_at, updated_at
- Relationship: many-to-one with User

## 🚀 Deployment

### Railway (Recommended)

1. Create account on railway.app
2. New Project → Deploy from GitHub
3. Add PostgreSQL service
4. Add environment variables
5. Deploy!

### Environment Variables for Production

```
DATABASE_URL=postgresql://...
SECRET_KEY=...
GROQ_API_KEY=...
REPLICATE_API_KEY=...
CORS_ORIGINS=["https://your-frontend.vercel.app"]
```

## 📝 Next Steps

- [ ] Add email verification
- [ ] Add usage limits/quotas
- [ ] Add payment integration (Stripe)
- [ ] Add rate limiting
- [ ] Add caching (Redis)
- [ ] Add WebSocket support
- [ ] Add file upload for images
- [ ] Add batch processing

## 🤝 Contributing

Contributions welcome! Open issues or PRs.

## 📄 License

MIT License

## 👨‍💻 Author

**Kanav Chauhan**
- GitHub: @KanavChauhan23
- LinkedIn: linkedin.com/in/kanavchauhan23
```
