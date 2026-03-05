"""AI Studio Pro - Main FastAPI Application"""
import time, logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.db.database import engine, Base
from app.api.routes import auth, generate

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    for attempt in range(5):
        try:
            Base.metadata.create_all(bind=engine)
            logger.info("✅ Database ready")
            break
        except Exception as e:
            wait = 2 ** attempt
            logger.warning(f"DB retry {attempt+1}/5: {e}. Waiting {wait}s…")
            time.sleep(wait)
    else:
        logger.error("❌ DB init failed — app starting without tables")
    yield

app = FastAPI(
    title="AI Studio Pro",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

ALLOWED_ORIGINS = [
    "https://ai-studio-pro-nu.vercel.app",
    "https://ai-studio-4iu377aoz-kanav-chauhans-projects.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
]

_env = settings.CORS_ORIGINS.strip()
if _env and _env != "*":
    for _o in _env.split(","):
        _o = _o.strip().rstrip("/")
        if _o and _o not in ALLOWED_ORIGINS:
            ALLOWED_ORIGINS.append(_o)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled: {exc}", exc_info=True)
    return JSONResponse(status_code=500, content={"detail": str(exc)})

app.include_router(auth.router)
app.include_router(generate.router)

@app.get("/")
async def root():
    return {"message": "AI Studio Pro API v2.0", "status": "online", "allowed_origins": ALLOWED_ORIGINS}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.options("/{rest_of_path:path}")
async def preflight_handler(rest_of_path: str):
    return {"message": "OK"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
