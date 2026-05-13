STONE_TYPES = {
    "strength": {"label": "力量", "color": "red", "emoji": "🔴", "hp": 5},
    "wisdom": {"label": "智慧", "color": "blue", "emoji": "🔵", "hp": 5},
    "charm": {"label": "魅力", "color": "pink", "emoji": "🩷", "hp": 5},
    "wealth": {"label": "财富", "color": "gold", "emoji": "🟡", "hp": 5},
    "joy": {"label": "小确幸", "color": "rainbow", "emoji": "🌈", "hp": 8},
}


def get_stone_color(stone_type: str) -> str:
    return STONE_TYPES.get(stone_type, {}).get("color", "blue")


def get_stone_hp(stone_type: str) -> int:
    return STONE_TYPES.get(stone_type, {}).get("hp", 5)


def get_stone_label(stone_type: str) -> str:
    return STONE_TYPES.get(stone_type, {}).get("label", "未知")
