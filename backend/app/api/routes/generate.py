"""Content generation API routes — all tools"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from app.db.database import get_db
from app.models.user import User
from app.models.content import Content, ContentType
from app.schemas.content import Content as ContentSchema
from app.services.groq_service import groq_service
from app.services.image_service import image_service
from app.api.routes.auth import get_current_user
import json

router = APIRouter(prefix="/api/generate", tags=["generation"])

def save_content(db, owner_id, title, content_type, prompt, result, meta=None):
    c = Content(title=title, content_type=content_type, prompt=prompt,
                result=result, content_metadata=json.dumps(meta or {}), owner_id=owner_id)
    db.add(c); db.commit(); db.refresh(c)
    return c

# ─── Request models ───────────────────────────────────────────────────────────
class TextReq(BaseModel):
    prompt: str; content_type: str = "blog"; tone: str = "professional"; length: str = "medium"

class ImageReq(BaseModel):
    prompt: str; style: str = "realistic"; aspect_ratio: str = "1:1"; num_outputs: int = 1

class CodeReq(BaseModel):
    prompt: str; language: str = "python"; task_type: str = "generate"

class ChatMessage(BaseModel):
    role: str; content: str

class ChatReq(BaseModel):
    messages: List[ChatMessage]; model: str = "llama-3.3-70b-versatile"

class DebugReq(BaseModel):
    code: str; language: str = "python"

class WebsiteReq(BaseModel):
    prompt: str; framework: str = "html"

class ResumeReq(BaseModel):
    details: str

class PromptReq(BaseModel):
    prompt: str; target: str = "image"

class YoutubeReq(BaseModel):
    topic: str; duration: str = "5min"

class RewriteReq(BaseModel):
    text: str; style: str = "professional"

class TranslateReq(BaseModel):
    text: str; target_language: str = "Spanish"

class EmailReq(BaseModel):
    details: str; email_type: str = "professional"

class DocReq(BaseModel):
    text: str

class StudyReq(BaseModel):
    text: str

class SocialReq(BaseModel):
    topic: str; platform: str = "instagram"

class SummarizeReq(BaseModel):
    text: str; length: str = "short"

class SearchReq(BaseModel):
    query: str

# ─── Routes ───────────────────────────────────────────────────────────────────
@router.post("/text")
async def generate_text(req: TextReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.generate_text(req.prompt, req.content_type, req.tone, req.length)
        c = save_content(db, u.id, f"{req.content_type.capitalize()} Content", ContentType.TEXT, req.prompt, result)
        return {"success": True, "content_id": c.id, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/image")
async def generate_image(req: ImageReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        images = image_service.generate_image(req.prompt, req.style, req.aspect_ratio, req.num_outputs)
        c = save_content(db, u.id, "Generated Image", ContentType.IMAGE, req.prompt, json.dumps(images))
        return {"success": True, "content_id": c.id, "images": images}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/code")
async def generate_code(req: CodeReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.generate_code(req.prompt, req.language, req.task_type)
        c = save_content(db, u.id, f"{req.language} Code", ContentType.CODE, req.prompt, result)
        return {"success": True, "content_id": c.id, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/chat")
async def ai_chat(req: ChatReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        msgs = [{"role": m.role, "content": m.content} for m in req.messages]
        result = groq_service.chat(msgs, req.model)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/debug")
async def debug_code(req: DebugReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.debug_code(req.code, req.language)
        c = save_content(db, u.id, "Code Debug", ContentType.CODE, req.code[:200], result)
        return {"success": True, "content_id": c.id, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/website")
async def generate_website(req: WebsiteReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.generate_website(req.prompt, req.framework)
        c = save_content(db, u.id, "Generated Website", ContentType.CODE, req.prompt, result)
        return {"success": True, "content_id": c.id, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/resume")
async def build_resume(req: ResumeReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.build_resume(req.details)
        c = save_content(db, u.id, "Resume & Cover Letter", ContentType.TEXT, req.details[:200], result)
        return {"success": True, "content_id": c.id, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/improve-prompt")
async def improve_prompt(req: PromptReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.improve_prompt(req.prompt, req.target)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/youtube-script")
async def youtube_script(req: YoutubeReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.generate_youtube_script(req.topic, req.duration)
        c = save_content(db, u.id, f"YouTube Script: {req.topic[:40]}", ContentType.TEXT, req.topic, result)
        return {"success": True, "content_id": c.id, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/rewrite")
async def rewrite_content(req: RewriteReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.rewrite_content(req.text, req.style)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/translate")
async def translate(req: TranslateReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.translate(req.text, req.target_language)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/email")
async def write_email(req: EmailReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.write_email(req.details, req.email_type)
        c = save_content(db, u.id, "Email Draft", ContentType.TEXT, req.details[:200], result)
        return {"success": True, "content_id": c.id, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/summarize-doc")
async def summarize_doc(req: DocReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.summarize_document(req.text)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/study-notes")
async def study_notes(req: StudyReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.generate_study_notes(req.text)
        c = save_content(db, u.id, "Study Notes", ContentType.TEXT, req.text[:100], result)
        return {"success": True, "content_id": c.id, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/social-post")
async def social_post(req: SocialReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.generate_social_post(req.topic, req.platform)
        c = save_content(db, u.id, f"{req.platform.capitalize()} Post", ContentType.TEXT, req.topic, result)
        return {"success": True, "content_id": c.id, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/summarize")
async def summarize(req: SummarizeReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.summarize_text(req.text, req.length)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/web-search")
async def web_search(req: SearchReq, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        result = groq_service.web_search_summary(req.query)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get("/history", response_model=List[ContentSchema])
async def get_history(u: User = Depends(get_current_user), db: Session = Depends(get_db), limit: int = 50, content_type: str = None):
    q = db.query(Content).filter(Content.owner_id == u.id)
    if content_type:
        q = q.filter(Content.content_type == content_type)
    return q.order_by(Content.created_at.desc()).limit(limit).all()

@router.delete("/content/{content_id}", status_code=204)
async def delete_content(content_id: int, u: User = Depends(get_current_user), db: Session = Depends(get_db)):
    c = db.query(Content).filter(Content.id == content_id, Content.owner_id == u.id).first()
    if not c:
        raise HTTPException(404, "Content not found")
    db.delete(c); db.commit()
