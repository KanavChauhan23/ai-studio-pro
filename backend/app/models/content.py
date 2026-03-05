"""
Content database model
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.db.database import Base


class ContentType(str, enum.Enum):
    """Content types"""
    TEXT = "text"
    IMAGE = "image"
    CODE = "code"
    VOICE = "voice"


class Content(Base):
    """Content model for storing generated content"""
    __tablename__ = "contents"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content_type = Column(Enum(ContentType), nullable=False)
    prompt = Column(Text, nullable=False)
    result = Column(Text, nullable=False)  # JSON or text
    content_metadata = Column(Text, nullable=True)  # CHANGED FROM 'metadata' - SQLAlchemy reserved word!
    
    # User relationship
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    owner = relationship("User", back_populates="contents")
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
