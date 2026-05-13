from pydantic import BaseModel


def _to_camel(s: str) -> str:
    parts = s.split("_")
    return parts[0] + "".join(p.capitalize() for p in parts[1:])


class CamelModel(BaseModel):
    class Config:
        alias_generator = _to_camel
        populate_by_name = True
        from_attributes = True
