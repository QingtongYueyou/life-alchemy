import random
from datetime import datetime, timezone


def calculate_draw_weight(
    is_favorite: bool,
    stone_type: str,
    has_image: bool,
    last_drawn_at: datetime | None,
    created_at: datetime,
) -> float:
    weight = 1.0

    if is_favorite:
        weight *= 2.0
    if stone_type == "joy":
        weight *= 1.5
    if has_image:
        weight *= 1.3

    now = datetime.now(timezone.utc)

    if last_drawn_at:
        days_since_draw = (now - last_drawn_at).days
        if days_since_draw < 7:
            weight *= 0.1

    if created_at:
        hours_since_create = (now - created_at).total_seconds() / 3600
        if hours_since_create < 24:
            weight *= 0.3

    return weight


def weighted_random_draw(stones_with_weights: list[tuple[str, float]]) -> str | None:
    if not stones_with_weights:
        return None

    total = sum(w for _, w in stones_with_weights)
    if total <= 0:
        return random.choice([s_id for s_id, _ in stones_with_weights])

    roll = random.random() * total
    cumulative = 0
    for stone_id, weight in stones_with_weights:
        cumulative += weight
        if roll <= cumulative:
            return stone_id

    return stones_with_weights[-1][0]
