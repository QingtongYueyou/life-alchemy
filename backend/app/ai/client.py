import json
import logging

import httpx

from app.ai.fallback import FALLBACK_MEMORY_MESSAGE, get_fallback_message, get_fallback_title
from app.ai.prompts import CREATE_STONE_PROMPT, MEMORY_DRAW_PROMPT
from app.ai.safety import check_content_safety, get_safety_response
from app.core.config import settings
from app.domain.stone_types import get_stone_label

logger = logging.getLogger(__name__)

AI_TIMEOUT = 10.0


async def call_llm(prompt: str) -> str | None:
    if not settings.LLM_API_KEY:
        return None

    try:
        async with httpx.AsyncClient(timeout=AI_TIMEOUT) as client:
            response = await client.post(
                f"{settings.LLM_BASE_URL}/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.LLM_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": settings.LLM_MODEL,
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.7,
                    "max_tokens": 200,
                },
            )
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"].strip()
    except Exception as e:
        logger.warning(f"LLM call failed: {e}")
        return None


async def generate_stone_ai(stone_type: str, content: str) -> tuple[str, str]:
    if check_content_safety(content):
        return "关心你", get_safety_response()

    type_label = get_stone_label(stone_type)
    prompt = CREATE_STONE_PROMPT.format(content=content, type_label=type_label)

    result = await call_llm(prompt)
    if result:
        try:
            parsed = json.loads(result)
            title = parsed.get("title", "")[:12]
            message = parsed.get("message", "")[:50]
            if title and message:
                return title, message
        except (json.JSONDecodeError, KeyError):
            pass

    return get_fallback_title(stone_type), get_fallback_message(stone_type)


async def generate_memory_ai(stone_type: str, content: str) -> str:
    if check_content_safety(content):
        return get_safety_response()

    type_label = get_stone_label(stone_type)
    prompt = MEMORY_DRAW_PROMPT.format(content=content, type_label=type_label)

    result = await call_llm(prompt)
    if result:
        message = result.strip()[:60]
        if message:
            return message

    return FALLBACK_MEMORY_MESSAGE
