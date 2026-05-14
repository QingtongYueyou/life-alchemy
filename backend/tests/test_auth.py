from unittest.mock import AsyncMock, patch

import pytest

from tests.conftest import TEST_USER_ID


@pytest.mark.asyncio
async def test_get_me(client):
    fake_profile = type("Profile", (), {
        "id": TEST_USER_ID,
        "nickname": None,
        "avatar_url": None,
        "hp": 50,
        "current_title": "初心者",
        "current_skin_id": "default",
    })()

    with patch("app.api.routes.auth.ProfileRepository") as mock_repo:
        mock_repo.return_value.create_if_not_exists = AsyncMock(return_value=fake_profile)
        resp = await client.get("/api/auth/me")

    assert resp.status_code == 200
    body = resp.json()
    assert body["success"] is True
    assert body["data"]["id"] == TEST_USER_ID
    assert body["data"]["hp"] == 50
