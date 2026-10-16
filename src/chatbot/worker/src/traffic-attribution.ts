/** Privacy-preserving attribution for the existing anonymous geo visit counter.
 * Store only daily aggregates; never persist referrer URLs, IPs, cookies or query strings.
 */
export type AnonymousVisit = {
  pathname?: unknown;
  source?: unknown;
  referrer?: unknown;
};
export type VisitDimensions = { channel: string; section: string; pageKey: string };

const KNOWN_CHANNELS: Record<string, string> = {
  ig: "instagram", instagram: "instagram", "l.instagram.com": "instagram",
  youtube: "youtube", youtu: "youtube", "youtu.be": "youtube",
  tiktok: "tiktok", "tiktok.com": "tiktok",
  pin: "pinterest", pinterest: "pinterest",
  linkedin: "linkedin", "lnkd.in": "linkedin",
  devto: "devto", "dev.to": "devto",
  threads: "threads", "threads.net": "threads",
  bluesky: "bluesky", bsky: "bluesky",
  mastodon: "mastodon", "mastodon.social": "mastodon",
  twitter: "x", x: "x",
  facebook: "facebook", fb: "facebook", "facebook.com": "facebook",
  reddit: "reddit", google: "google", bing: "bing",
  newsletter: "newsletter", email: "email",
  direct: "direct",
};

export function visitChannel(source: unknown, referrer: unknown): string {
  const explicit = String(typeof source === "string" ? source : "").toLowerCase().trim();
  const normalized = KNOWN_CHANNELS[explicit];
  if (normalized) return normalized;
  if (explicit) return "other";
  if (typeof referrer !== "string" || referrer.length > 300) return "direct";
  try {
    const url = new URL(referrer);
    if (!["https:", "http:"].includes(url.protocol)) return "direct";
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host === "pklavc.com") return "direct";
    if (/\.instagram\.com$/.test(host) || host === "instagram.com") return "instagram";
    if (host === "youtube.com" || host.endsWith(".youtube.com") || host === "youtu.be") return "youtube";
    if (host === "tiktok.com" || host.endsWith(".tiktok.com")) return "tiktok";
    if (host === "pinterest.com" || host.endsWith(".pinterest.com")) return "pinterest";
    if (host === "linkedin.com" || host.endsWith(".linkedin.com") || host === "lnkd.in") return "linkedin";
    if (host === "dev.to") return "devto";
    if (host === "threads.net" || host.endsWith(".threads.net")) return "threads";
    if (host === "bsky.app") return "bluesky";
    if (host === "mastodon.social" || host.endsWith(".mastodon.social")) return "mastodon";
    if (host === "facebook.com" || host.endsWith(".facebook.com") || host === "fb.com") return "facebook";
    if (host === "x.com" || host.endsWith(".x.com") || host === "t.co" || host === "twitter.com") return "x";
    if (host === "reddit.com" || host.endsWith(".reddit.com")) return "reddit";
    if (host === "google.com" || host.startsWith("google.") || host.includes(".google.")) return "google";
    if (host === "bing.com" || host.endsWith(".bing.com")) return "bing";
    return "other";
  } catch {
    return "direct";
  }
}

export function pageDimensions(pathname: unknown): Pick<VisitDimensions, "section" | "pageKey"> {
  const path = typeof pathname === "string" && pathname.startsWith("/")
    ? pathname.split("?")[0].split("#")[0].toLowerCase() : "/";
  const article = /^\/blog\/(?:en|pt|es)\/(games|tech)\/([a-z0-9-]{1,90})\/?(?:index\.html)?$/.exec(path);
  if (article) return { section: article[1], pageKey: article[1] + "/" + article[2] };
  const categoryListing = /^\/blog\/(?:en|pt|es)\/(games|tech)\/?$/.exec(path);
  if (categoryListing) return { section: categoryListing[1], pageKey: "listing" };
  if (/^\/blog\/(?:en|pt|es)\/?$/.test(path) || path === "/blog/" || path === "/blog") {
    return { section: "blog", pageKey: "listing" };
  }
  if (/^\/store(?:\/|$)/.test(path)) return { section: "store", pageKey: "store" };
  if (path === "/" || path === "/pt/" || path === "/es/") return { section: "portfolio", pageKey: "home" };
  // Unrecognized paths cannot inject arbitrary article IDs, paths or private data.
  return { section: "portfolio", pageKey: "other" };
}

export function dimensionsOfVisit(raw: unknown): VisitDimensions {
  const visit = raw && typeof raw === "object" && !Array.isArray(raw) ? raw as AnonymousVisit : {};
  return { channel: visitChannel(visit.source, visit.referrer), ...pageDimensions(visit.pathname) };
}
