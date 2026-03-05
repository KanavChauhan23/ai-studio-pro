"""Groq AI service — text, code, and all 14 new tools"""
from groq import Groq
from app.core.config import settings


class GroqService:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model  = "llama-3.3-70b-versatile"
        self.fast   = "llama-3.1-8b-instant"

    def _chat(self, system: str, user: str, temperature=0.7, max_tokens=2000, fast=False) -> str:
        model = self.fast if fast else self.model
        r = self.client.chat.completions.create(
            model=model,
            messages=[{"role":"system","content":system},{"role":"user","content":user}],
            temperature=temperature, max_tokens=max_tokens
        )
        return r.choices[0].message.content

    # ─── Existing ────────────────────────────────────────────────────────────
    def generate_text(self, prompt, content_type="blog", tone="professional", length="medium"):
        sys = f"You are an expert {content_type} writer. Use a {tone} tone. {'100-200 words' if length=='short' else '300-500 words' if length=='medium' else '600-1000 words'}."
        return self._chat(sys, prompt)

    def generate_code(self, prompt, language="python", task_type="generate"):
        sys = f"You are an expert {language} programmer. Task: {task_type}. Return clean, well-commented {language} code."
        return self._chat(sys, prompt, temperature=0.3)

    # ─── New tools ────────────────────────────────────────────────────────────
    def chat(self, messages: list, model_name="llama-3.3-70b-versatile") -> str:
        r = self.client.chat.completions.create(
            model=model_name, messages=messages, temperature=0.7, max_tokens=2000
        )
        return r.choices[0].message.content

    def debug_code(self, code: str, language: str = "python") -> str:
        sys = f"You are an expert {language} debugger. Find ALL bugs, explain each one clearly, then provide the fully corrected code with inline comments marking every fix."
        return self._chat(sys, code, temperature=0.2)

    def generate_website(self, prompt: str, framework: str = "html") -> str:
        frameworks = {
            "html":  "Return a complete single-file HTML/CSS/JS website. Use modern CSS, beautiful design, no external dependencies except Google Fonts.",
            "react": "Return a complete single-file React component (no imports needed, assume React is available). Use inline Tailwind-style CSS-in-JS.",
        }
        sys = f"You are a world-class frontend developer. {frameworks.get(framework, frameworks['html'])} Return ONLY the code, no explanation."
        return self._chat(sys, prompt, temperature=0.5, max_tokens=4000)

    def build_resume(self, details: str) -> str:
        sys = "You are a professional resume writer. Create a polished, ATS-optimized resume AND a matching cover letter from the user's details. Use clean markdown formatting with clear sections."
        return self._chat(sys, details)

    def improve_prompt(self, prompt: str, target: str = "image") -> str:
        sys = f"You are an expert prompt engineer for {target} AI models. Rewrite the user's prompt to be dramatically more effective. Return: 1) The improved prompt 2) What you changed and why."
        return self._chat(sys, prompt, fast=True)

    def generate_youtube_script(self, topic: str, duration: str = "5min") -> str:
        sys = f"You are a viral YouTube scriptwriter. Write a complete, engaging script for a {duration} video. Include: hook, intro, main content sections, transitions, CTA, outro. Add [VISUAL CUE] markers."
        return self._chat(sys, topic, max_tokens=3000)

    def rewrite_content(self, text: str, style: str = "professional") -> str:
        sys = f"You are an expert content editor. Rewrite the given text in a {style} style. Improve clarity, flow, and impact while keeping the core message. Return the rewritten version only."
        return self._chat(sys, text, fast=True)

    def translate(self, text: str, target_language: str = "Spanish") -> str:
        sys = f"You are a professional translator. Translate the text to {target_language} accurately, preserving tone, nuance, and formatting. Return only the translation."
        return self._chat(sys, text, temperature=0.3, fast=True)

    def write_email(self, details: str, email_type: str = "professional") -> str:
        sys = f"You are an expert email writer. Write a {email_type} email based on the user's requirements. Include subject line, greeting, body, and sign-off. Make it compelling and clear."
        return self._chat(sys, details)

    def summarize_document(self, text: str) -> str:
        sys = "You are an expert document analyst. Provide: 1) A concise executive summary (3-5 sentences) 2) Key points as bullet list 3) Important numbers/facts 4) Main conclusions."
        return self._chat(sys, text[:8000], max_tokens=1500)

    def generate_study_notes(self, text: str) -> str:
        sys = "You are an expert educator. Convert the text into structured study notes: key concepts, definitions, important facts, memory tips, and a quick-review summary at the end. Use clear markdown."
        return self._chat(sys, text[:8000])

    def generate_social_post(self, topic: str, platform: str = "instagram") -> str:
        platform_guides = {
            "instagram": "Write 3 Instagram post variations: one story-driven, one educational, one engagement-bait. Include relevant emojis and 20+ hashtags.",
            "linkedin":  "Write a professional LinkedIn post with a strong hook, valuable insight, personal touch, and CTA. Max 1300 chars. No hashtag spam.",
            "twitter":   "Write 5 tweet variations under 280 chars each. Include relevant hashtags. Mix informative and conversational styles.",
        }
        sys = f"You are a social media marketing expert. {platform_guides.get(platform, platform_guides['instagram'])}"
        return self._chat(sys, topic)

    def summarize_text(self, text: str, length: str = "short") -> str:
        lengths = {"short": "2-3 sentences", "medium": "1 paragraph", "long": "2-3 paragraphs"}
        sys = f"You are an expert summarizer. Summarize the text in {lengths.get(length, lengths['short'])}. Be concise and capture the most important information only."
        return self._chat(sys, text[:8000], fast=True)

    def web_search_summary(self, query: str) -> str:
        sys = "You are a research assistant. The user wants to search the web. Since you cannot access real-time data, provide: 1) What you know about this topic 2) Key things to look for 3) Suggested search terms 4) Likely sources to check. Be helpful and thorough."
        return self._chat(sys, query)


groq_service = GroqService()
