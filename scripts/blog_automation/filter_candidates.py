from __future__ import annotations


def filter_today(candidates: list[dict], day: str) -> list[dict]:
    today = [candidate for candidate in candidates if candidate.get("published_date") == day]
    print(f"Candidatos publicados na data local de hoje ({day}): {len(today)}")
    return today
