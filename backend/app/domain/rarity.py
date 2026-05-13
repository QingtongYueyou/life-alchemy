import random

NORMAL_RARITY_TABLE = [
    ("normal", 80),
    ("shiny", 15),
    ("rare", 4),
    ("legendary", 1),
]

IMAGE_RARITY_TABLE = [
    ("normal", 65),
    ("shiny", 25),
    ("rare", 8),
    ("legendary", 2),
]


def roll_rarity(has_image: bool = False) -> str:
    table = IMAGE_RARITY_TABLE if has_image else NORMAL_RARITY_TABLE
    roll = random.randint(1, 100)
    cumulative = 0
    for rarity, weight in table:
        cumulative += weight
        if roll <= cumulative:
            return rarity
    return "normal"
