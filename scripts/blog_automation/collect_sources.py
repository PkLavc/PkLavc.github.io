from __future__ import annotations

import datetime as dt
import json
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path

UA = "PkLavcDailyBlog/1.0 (+https://pklavc.com/editorial-policy/)"


def safe_log(value: str) -> str:
    return "".join(ch if ch >= " " and ch != "\x7f" else " " for ch in str(value)).replace("::", "﹕﹕")[:500]


def collect(root: Path) -> tuple[list[dict], list[str]]:
    config = json.loads((root / "scripts/blog_automation/sources.json").read_text(encoding="utf-8"))
    candidates, checked = [], []
    for feed in config["feeds"]:
        try:
            req = urllib.request.Request(feed["url"], headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=18) as response:
                body = response.read(2_000_000)
            checked.append(feed["name"])
            xml = ET.fromstring(body)
            for entry in xml.findall(".//item") + xml.findall(".//{http://www.w3.org/2005/Atom}entry"):
                def value(*names):
                    for name in names:
                        node = entry.find(name)
                        if node is not None and (node.text or "").strip():
                            return (node.text or "").strip()
                    return ""
                title = value("title", "{http://www.w3.org/2005/Atom}title")
                link = value("link", "{http://www.w3.org/2005/Atom}link")
                if not link:
                    link_node = entry.find("{http://www.w3.org/2005/Atom}link")
                    link = link_node.attrib.get("href", "") if link_node is not None else ""
                summary = value("description", "summary", "{http://www.w3.org/2005/Atom}summary", "{http://www.w3.org/2005/Atom}content")
                date_raw = value("pubDate", "published", "updated", "{http://www.w3.org/2005/Atom}published", "{http://www.w3.org/2005/Atom}updated")
                try:
                    stamp = parsedate_to_datetime(date_raw) if "," in date_raw else dt.datetime.fromisoformat(date_raw.replace("Z", "+00:00"))
                    if stamp.tzinfo is None:
                        stamp = stamp.replace(tzinfo=dt.timezone.utc)
                    published = stamp.astimezone(dt.timezone(dt.timedelta(hours=-3))).date()
                except (ValueError, TypeError, OverflowError):
                    continue
                if title and link.startswith("https://"):
                    candidates.append({"id": len(candidates) + 1, "publisher": feed["name"], "primary": feed["primary"], "title": title[:400], "url": link, "published_date": published.isoformat(), "summary": summary[:3000]})
        except (OSError, urllib.error.URLError, ET.ParseError, TimeoutError) as exc:
            print(f"Fonte indisponível: {feed['name']} ({type(exc).__name__})")
    print("Fontes verificadas: " + (", ".join(checked) if checked else "nenhuma"))
    print(f"Itens coletados dos feeds: {len(candidates)}")
    return candidates, checked
