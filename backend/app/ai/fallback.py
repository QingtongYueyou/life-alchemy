FALLBACK_TITLES = {
    "strength": "行动之光",
    "wisdom": "安静升级",
    "charm": "发光时刻",
    "wealth": "认真建设",
    "joy": "小小快乐",
}

FALLBACK_MESSAGES = {
    "strength": "你又为自己积累了一点行动的力量。",
    "wisdom": "你正在把新的知识，慢慢变成自己的东西。",
    "charm": "你愿意表达和靠近世界，这本身就很珍贵。",
    "wealth": "你正在认真建设自己的生活。",
    "joy": "这份小小的快乐，值得被好好保存。",
}

FALLBACK_MEMORY_MESSAGE = "这颗宝石提醒你，过去的你曾经认真生活过。今天也可以慢慢来。"


def get_fallback_title(stone_type: str) -> str:
    return FALLBACK_TITLES.get(stone_type, "生活之光")


def get_fallback_message(stone_type: str) -> str:
    return FALLBACK_MESSAGES.get(stone_type, "你正在认真生活，这本身就值得被记录。")
