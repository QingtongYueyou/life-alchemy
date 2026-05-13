def clamp_hp(value: int) -> int:
    return max(0, min(100, value))


def get_create_stone_hp(stone_type: str) -> int:
    if stone_type == "joy":
        return 8
    return 5


MEMORY_DRAW_HP = 10
FAVORITE_HP = 2
