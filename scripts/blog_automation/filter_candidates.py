from __future__ import annotations


def safe_log(value: str) -> str:
    return "".join(ch if ch >= " " and ch != "\x7f" else " " for ch in str(value)).replace("::", "﹕﹕")[:500]


def filter_today(candidates: list[dict], day: str) -> list[dict]:
    today = [candidate for candidate in candidates if candidate.get("published_date") == day]
    print(f"Candidatos publicados na data local de hoje ({day}): {len(today)}")
    for item in today:
        print(f"Candidato #{item['id']} [{safe_log(item['publisher'])}]: {safe_log(item['title'])} ({safe_log(item['url'])})")
    return today
