"""
Core configuration for AI Studio Pro
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings"""
    
    # App settings
    APP_NAME: str = "AI Studio Pro"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost/ai_studio"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS - accepts string (will be parsed later)
    CORS_ORIGINS: str = "*"
    
    # AI Service API Keys
    GROQ_API_KEY: str = ""
    REPLICATE_API_KEY: str = ""
    ELEVENLABS_API_KEY: Optional[str] = None
    
    # File upload
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    UPLOAD_DIR: str = "uploads"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
