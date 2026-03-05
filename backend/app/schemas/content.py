"""
Content schemas for request/response validation
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.content import ContentType


class ContentBase(BaseModel):
    """Base content schema"""
    title: str
    content_type: ContentType
    prompt: str


class ContentCreate(ContentBase):
    """Schema for content creation"""
    pass


class Content(BaseModel):
    """Schema for content response"""
    id: int
    title: str
    content_type: ContentType
    prompt: str
    result: str
    content_metadata: Optional[str] = None   # ✅ FIXED (was metadata)
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True   # Required for SQLAlchemy


# -------------------------
# Generate Request Schemas
# -------------------------

class TextGenerateRequest(BaseModel):
    """Schema for text generation request"""
    prompt: str
    content_type: str = "blog"
    tone: str = "professional"
    length: str = "medium"


class ImageGenerateRequest(BaseModel):
    """Schema for image generation request"""
    prompt: str
    style: str = "realistic"
    aspect_ratio: str = "1:1"


class CodeGenerateRequest(BaseModel):
    """Schema for code generation request"""
    prompt: str
    language: str = "python"
    task_type: str = "generate"


class VoiceGenerateRequest(BaseModel):
    """Schema for voice generation request"""
    text: str
    voice: str = "default"
    speed: float = 1.0
