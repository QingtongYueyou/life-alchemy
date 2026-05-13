import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.api.router import api_router
from app.core.config import settings
from app.core.cors import setup_cors
from app.core.errors import AppError

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version="0.1.0",
        docs_url="/docs" if settings.APP_ENV == "local" else None,
        redoc_url=None,
    )

    setup_cors(app)

    app.include_router(api_router, prefix=settings.API_PREFIX)

    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "data": None,
                "error": (
                    exc.detail
                    if isinstance(exc.detail, dict)
                    else {"code": "ERROR", "message": str(exc.detail)}
                ),
            },
        )

    return app


app = create_app()


@app.get("/")
async def root():
    return {"service": settings.APP_NAME, "version": "0.1.0"}
