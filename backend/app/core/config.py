from pydantic import model_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_ENV: str = "local"
    APP_NAME: str = "life-alchemy-api"
    API_PREFIX: str = "/api"

    DATABASE_URL: str = ""
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    SUPABASE_JWT_SECRET: str = ""

    LLM_API_KEY: str = ""
    LLM_BASE_URL: str = "https://api.openai.com/v1"
    LLM_MODEL: str = "gpt-4o-mini"

    CORS_ORIGINS: str = "http://localhost:3000"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    @model_validator(mode="after")
    def _check_critical_envs(self) -> "Settings":
        missing = [
            name for name in ("DATABASE_URL", "SUPABASE_JWT_SECRET") if not getattr(self, name)
        ]
        if missing:
            raise ValueError(f"Missing required env vars: {', '.join(missing)}")
        return self

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]


settings = Settings()
