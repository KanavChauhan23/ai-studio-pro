# ⚡ AI Studio Pro

> A professional, full-stack AI workspace with 17 tools — built with Next.js, FastAPI, and Groq.

**Live Demo → [AI STUDIO PRO +](https://ai-studio-pro-nu.vercel.app)**

![AI Studio Pro](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=flat-square&logo=fastapi)
![Groq](https://img.shields.io/badge/Powered_by-Groq-orange?style=flat-square)

---

## 🚀 Features

| Tool | Description |
|------|-------------|
| 💬 **AI Chat** | Chat with Llama 3.3 70B, Llama 3.1 8B, Mixtral 8x7B |
| 🖼️ **Image Generator** | Free AI images via Pollinations.ai — no credits needed |
| 📝 **Text Generator** | Blogs, emails, social posts, product descriptions |
| 💻 **Code Generator** | Generate, fix, explain, or convert code in any language |
| 🐛 **Code Debugger** | Find bugs, get explanations, receive fixed code |
| 🌐 **Website Builder** | Full HTML/React websites from a text description |
| 📄 **Document Summarizer** | Deep summary and key points from long documents |
| 📋 **Resume Builder** | ATS-optimized resume + matching cover letter |
| ✨ **Prompt Improver** | Turn weak prompts into powerful AI instructions |
| 🎬 **YouTube Script** | Complete scripts with hooks, sections, and CTAs |
| ✏️ **Content Rewriter** | Rewrite any content in a different style or tone |
| 🌍 **Translator** | Accurate translation into 100+ languages |
| 📧 **Email Writer** | Professional emails for any situation |
| 🔍 **Web Search AI** | AI-powered research assistant |
| 📚 **Study Notes** | Convert lectures or textbooks into smart notes |
| 📱 **Social Posts** | Optimized posts for Instagram, LinkedIn, Twitter |
| 📰 **Text Summarizer** | Instant concise summaries of any content |

---

## 🛠️ Tech Stack

**Frontend**
- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Zustand](https://zustand-demo.pmnd.rs/) — State management
- [Axios](https://axios-http.com/) — HTTP client
- Deployed on **[Vercel](https://vercel.com)**

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) — Python API framework
- [SQLAlchemy](https://www.sqlalchemy.org/) — ORM
- [PostgreSQL](https://www.postgresql.org/) — Database
- [Groq SDK](https://console.groq.com/) — LLM inference (ultra-fast)
- [Pollinations.ai](https://pollinations.ai/) — Free image generation
- [Passlib](https://passlib.readthedocs.io/) + [JWT](https://jwt.io/) — Authentication
- Deployed on **[Render](https://render.com)**

---

## 📁 Project Structure

```
ai-studio-pro/
├── frontend/                   # Next.js app
│   ├── src/
│   │   ├── app/                # Pages (App Router)
│   │   │   ├── chat/           # AI Chat
│   │   │   ├── dashboard/      # Dashboard
│   │   │   ├── generate/       # Image, Text, Code generators
│   │   │   ├── tools/          # All 13 other tools
│   │   │   ├── login/          # Auth pages
│   │   │   └── register/
│   │   ├── components/         # Reusable components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── AppLayout.tsx
│   │   │   └── ToolPage.tsx    # Generic tool wrapper
│   │   ├── lib/
│   │   │   ├── api.ts          # Axios instance
│   │   │   └── auth.ts         # Zustand auth store
│   │   └── styles/
│   │       └── globals.css     # Design system
│   └── package.json
│
├── backend/                    # FastAPI app
│   ├── app/
│   │   ├── main.py             # App entry point + CORS
│   │   ├── api/routes/
│   │   │   ├── auth.py         # Register, login, /me
│   │   │   └── generate.py     # All 17 AI tool endpoints
│   │   ├── services/
│   │   │   ├── groq_service.py # All Groq-powered tools
│   │   │   └── image_service.py# Free image generation
│   │   ├── models/             # SQLAlchemy models
│   │   ├── schemas/            # Pydantic schemas
│   │   ├── core/               # Config + security
│   │   └── db/                 # Database connection
│   └── requirements.txt
│
├── Dockerfile                  # Container config
├── nixpacks.toml               # Render build config
└── render.yaml                 # Render deployment config
```

---

## ⚙️ Local Development

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL database

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/ai-studio-pro.git
cd ai-studio-pro
```

### 2. Set up the backend
```bash
cd backend
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your values
```

**Backend `.env`:**
```env
DATABASE_URL=postgresql://user:password@localhost/ai_studio
SECRET_KEY=your-super-secret-key-here
GROQ_API_KEY=your_groq_api_key
CORS_ORIGINS=http://localhost:3000
```

```bash
# Run backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Set up the frontend
```bash
cd frontend
npm install

# Create .env.local
cp .env.local.example .env.local
# Edit .env.local
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
# Run frontend
npm run dev
```

Visit **http://localhost:3000**

---

## 🌐 Deployment

### Backend → Render
1. Push repo to GitHub
2. Create new **Web Service** on [render.com](https://render.com)
3. Connect your GitHub repo
4. Set environment variables in Render dashboard:
   - `DATABASE_URL`
   - `GROQ_API_KEY`
   - `SECRET_KEY`
   - `CORS_ORIGINS` → your Vercel URL

### Frontend → Vercel
1. Import repo on [vercel.com](https://vercel.com)
2. Set root directory to `frontend`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` → your Render backend URL

---

## 🔑 Getting API Keys

| Service | Free Tier | Link |
|---------|-----------|------|
| **Groq** | 14,400 req/day free | [console.groq.com](https://console.groq.com) |
| **Pollinations.ai** | Unlimited, no key needed | Built-in |

---

## 👤 Author

**Kanav Chauhan**
- Portfolio: [kanavportfolio.vercel.app](https://kanavportfolio.vercel.app)
- GitHub: [@KanavChauhan](https://github.com/KanavChauhan)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.
