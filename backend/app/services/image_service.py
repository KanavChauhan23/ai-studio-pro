"""
Free image generation using Pollinations.ai (no API key needed)
and HuggingFace as fallback
"""
import requests
import os
import urllib.parse
from typing import List


class ImageService:
    """Free image generation — no credits needed"""

    def generate_image(
        self,
        prompt: str,
        style: str = "realistic",
        aspect_ratio: str = "1:1",
        num_outputs: int = 1,
    ) -> List[str]:

        style_prompts = {
            "realistic": "photorealistic, highly detailed, 8k, professional photography",
            "artistic":  "artistic, oil painting, vibrant colors, masterpiece",
            "cartoon":   "cartoon style, animated, colorful, cute",
            "sketch":    "pencil sketch, hand-drawn, black and white, detailed",
            "anime":     "anime style, manga art, detailed, studio quality",
            "3d":        "3d render, cinema4d, octane render, ultra realistic",
        }

        dimensions = {
            "1:1":  (512, 512),
            "16:9": (768, 432),
            "9:16": (432, 768),
            "4:3":  (640, 480),
        }
        w, h = dimensions.get(aspect_ratio, (1024, 1024))

        enhanced = f"{prompt}, {style_prompts.get(style, style_prompts['realistic'])}"
        encoded  = urllib.parse.quote(enhanced)

        images = []
        for i in range(num_outputs):
            # Pollinations.ai — completely free, no key
            seed = 42 + i
            url = f"https://image.pollinations.ai/prompt/{encoded}?width={w}&height={h}&seed={seed}&nologo=true&model=flux"
            images.append(url)

        return images


image_service = ImageService()
