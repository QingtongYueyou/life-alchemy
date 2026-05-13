SAFETY_KEYWORDS = [
    "自杀",
    "自残",
    "不想活",
    "死了算了",
    "活不下去",
    "结束生命",
    "跳楼",
    "割腕",
    "轻生",
    "想死",
]

SAFETY_RESPONSE = (
    "我很在意你现在的感受。如果你正处在危险中，"
    "请马上联系身边可信任的人，或拨打当地紧急求助电话。"
    "你不需要一个人扛着。"
)


def check_content_safety(content: str) -> bool:
    content_lower = content.lower()
    return any(keyword in content_lower for keyword in SAFETY_KEYWORDS)


def get_safety_response() -> str:
    return SAFETY_RESPONSE
