DISTRIBUTION_TITLES = {
    "strength": "充满行动力的勇者",
    "wisdom": "安静升级的贤者学徒",
    "charm": "闪闪发光的表达者",
    "wealth": "认真建设生活的实干家",
    "joy": "会照顾快乐的精灵",
    None: "多方向稳定生长的炼金术师",
}

DISTRIBUTION_SUMMARIES = {
    "strength": "这个月你留下了很多红色力量石，说明你在持续行动和突破自己。",
    "wisdom": "这个月你留下了很多蓝色智慧石，说明你正在持续学习和吸收新的东西。",
    "charm": "这个月你留下了很多粉色魅力石，说明你更愿意表达自己、靠近世界。",
    "wealth": "这个月你留下了很多金色财富石，说明你在认真建设和积累。",
    "joy": "这个月你留下了很多彩色小确幸石，说明你更会发现和保存生活中的快乐。",
    None: "这个月你在多个方向都有积累，保持均衡也是一种很棒的状态。",
}


def get_dominant_type(distribution: dict[str, int]) -> str | None:
    if not distribution:
        return None

    max_count = max(distribution.values())
    if max_count == 0:
        return None

    dominant = [k for k, v in distribution.items() if v == max_count]
    if len(dominant) >= 3:
        return None
    return dominant[0]


def get_growth_title(dominant_type: str | None) -> str:
    return DISTRIBUTION_TITLES.get(dominant_type, DISTRIBUTION_TITLES[None])


def get_growth_summary(dominant_type: str | None) -> str:
    return DISTRIBUTION_SUMMARIES.get(dominant_type, DISTRIBUTION_SUMMARIES[None])
