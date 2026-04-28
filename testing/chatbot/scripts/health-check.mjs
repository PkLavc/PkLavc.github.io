const targets = [
  process.env.HEALTH_FRONTEND_URL || "https://pklavc.com/testing/",
  process.env.HEALTH_API_URL || "https://api.pklavc.com/health"
];

let failed = 0;
for (const url of targets) {
  try {
    const res = await fetch(url, { method: "GET" });
    console.log(`${url} -> ${res.status}`);
    if (!res.ok) failed += 1;
  } catch (error) {
    failed += 1;
    console.error(`${url} failed`, error);
  }
}

if (failed > 0) process.exit(1);
