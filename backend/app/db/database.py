"""
Database connection and session management
Configured for Supabase PostgreSQL (free tier friendly)
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Supabase PostgreSQL connection
# Uses connection pooling settings safe for Supabase free tier
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,       # Checks connection health before using
    pool_size=5,              # Keep max 5 connections (Supabase free limit)
    max_overflow=0,           # No extra connections beyond pool_size
    pool_recycle=300,         # Recycle connections every 5 minutes
    connect_args={
        "sslmode": "require"  # Supabase requires SSL
    }
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


def get_db():
    """Database session dependency"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
