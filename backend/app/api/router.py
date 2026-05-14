from fastapi import APIRouter

from app.api.routes import auth, health, memory, stats, stones

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(health.router)
api_router.include_router(stones.router)
api_router.include_router(memory.router)
api_router.include_router(stats.router)
