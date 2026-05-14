from unittest.mock import AsyncMock

import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.main import create_app

TEST_USER_ID = "test-user-00000000-0000-0000-0000-000000000000"


@pytest.fixture
def app():
    return create_app()


@pytest.fixture
def mock_db():
    return AsyncMock(spec=AsyncSession)


@pytest.fixture
async def client(app, mock_db):
    async def _override_db():
        yield mock_db

    app.dependency_overrides[__import__("app.api.deps", fromlist=["get_db"]).get_db] = _override_db
    app.dependency_overrides[
        __import__("app.core.security", fromlist=["get_current_user_id"]).get_current_user_id
    ] = lambda: TEST_USER_ID

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c

    app.dependency_overrides.clear()
