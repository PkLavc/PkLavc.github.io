const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const version = (process.env.INSTAGRAM_GRAPH_API_VERSION || "v26.0").replace(/^v?/, "v");

if (!accessToken) {
  console.error("Instagram webhook subscription failed: access token is not configured.");
  process.exit(1);
}

const baseUrl = `https://graph.instagram.com/${version}`;
const headers = { Authorization: `Bearer ${accessToken}` };
const requiredFields = [
  "messages",
  "message_edit",
  "message_reactions",
  "messaging_seen",
  "messaging_postbacks",
];

const accountResponse = await fetch(`${baseUrl}/me?fields=id`, { headers });
const account = await accountResponse.json().catch(() => ({}));
if (!accountResponse.ok || typeof account.id !== "string") {
  reportFailure("resolve Instagram account", accountResponse.status, account.error);
  process.exit(1);
}

const endpoint = `${baseUrl}/${encodeURIComponent(account.id)}/subscribed_apps`;
let current = await getSubscription(endpoint);
if (!current.ok) {
  reportFailure("read Instagram account webhook subscriptions", current.status, current.error);
  process.exit(1);
}

let subscribedFields = readSubscribedFields(current.body);
const missingFields = requiredFields.filter((field) => !subscribedFields.includes(field));
if (missingFields.length > 0) {
  const subscription = new URLSearchParams({ subscribed_fields: requiredFields.join(",") });
  const subscriptionResponse = await fetch(endpoint, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded" },
    body: subscription,
  });
  const result = await subscriptionResponse.json().catch(() => ({}));
  if (!subscriptionResponse.ok || result.success !== true) {
    reportFailure("subscribe Instagram account to messaging webhooks", subscriptionResponse.status, result.error);
    process.exit(1);
  }

  current = await getSubscription(endpoint);
  if (!current.ok) {
    reportFailure("verify Instagram account webhook subscriptions", current.status, current.error);
    process.exit(1);
  }
  subscribedFields = readSubscribedFields(current.body);
}

const stillMissing = requiredFields.filter((field) => !subscribedFields.includes(field));
if (stillMissing.length > 0) {
  console.error(`Instagram account webhook subscription is incomplete; missing fields: ${stillMissing.join(", ")}.`);
  process.exit(1);
}

console.log(`Instagram account webhook subscription confirmed: ${requiredFields.join(", ")}.`);

async function getSubscription(url) {
  const response = await fetch(url, { headers });
  const body = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, body, error: body.error };
}

function readSubscribedFields(body) {
  if (Array.isArray(body?.data)) {
    return [...new Set(body.data.flatMap((app) => Array.isArray(app.subscribed_fields) ? app.subscribed_fields : []))];
  }
  return Array.isArray(body?.subscribed_fields) ? body.subscribed_fields : [];
}

function reportFailure(operation, status, error) {
  const code = Number.isInteger(error?.code) ? `, Graph API code ${error.code}` : "";
  const type = typeof error?.type === "string" ? ` (${error.type})` : "";
  console.error(`Could not ${operation}: HTTP ${status}${code}${type}.`);
}

