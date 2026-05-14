from datetime import datetime
from unittest.mock import AsyncMock, patch

import pytest


def _fake_stone(**overrides):
    defaults = {
        "id": "stone-aaaa-bbbb-cccc",
        "type": "joy",
        "color": "rainbow",
        "content": "今天天气很好",
        "image_url": None,
        "ai_title": "晴朗小确幸",
        "ai_message": "阳光洒在身上，心情也亮了",
        "rarity": "shiny",
        "shape": "crystal",
        "is_favorite": False,
        "created_at": datetime(2026, 5, 14, 10, 0, 0),
    }
    defaults.update(overrides)
    return type("Stone", (), defaults)()


@pytest.mark.asyncio
async def test_create_stone(client):
    stone = _fake_stone()
    fake_response = type("Resp", (), {
        "stone": stone,
        "hp_change": 8,
        "hp_after": 58,
    })()

    with patch("app.api.routes.stones.StoneService") as mock_svc:
        mock_svc.return_value.create_stone = AsyncMock(return_value=fake_response)
        resp = await client.post(
            "/api/stones",
            json={"type": "joy", "content": "今天天气很好"},
        )

    assert resp.status_code == 200
    body = resp.json()
    assert body["success"] is True
    assert body["data"]["hpChange"] == 8
    assert body["data"]["stone"]["aiTitle"] == "晴朗小确幸"


@pytest.mark.asyncio
async def test_list_stones(client):
    stone = _fake_stone()
    fake_list = type("List", (), {"list": [stone], "total": 1})()

    with patch("app.api.routes.stones.StoneService") as mock_svc:
        mock_svc.return_value.list_stones = AsyncMock(return_value=fake_list)
        resp = await client.get("/api/stones")

    assert resp.status_code == 200
    body = resp.json()
    assert body["success"] is True
    assert len(body["data"]["list"]) == 1
    assert body["data"]["total"] == 1


@pytest.mark.asyncio
async def test_get_stone(client):
    stone = _fake_stone()

    with patch("app.api.routes.stones.StoneService") as mock_svc:
        mock_svc.return_value.get_stone = AsyncMock(return_value=stone)
        resp = await client.get(f"/api/stones/{stone.id}")

    assert resp.status_code == 200
    body = resp.json()
    assert body["success"] is True
    assert body["data"]["id"] == stone.id


@pytest.mark.asyncio
async def test_favorite_stone(client):
    stone = _fake_stone(is_favorite=True)

    with patch("app.api.routes.stones.StoneService") as mock_svc:
        mock_svc.return_value.toggle_favorite = AsyncMock(return_value=stone)
        resp = await client.post(f"/api/stones/{stone.id}/favorite")

    assert resp.status_code == 200
    body = resp.json()
    assert body["data"]["isFavorite"] is True
