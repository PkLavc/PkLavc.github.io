const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const version = (process.env.INSTAGRAM_GRAPH_API_VERSION || "v26.0").replace(/^v?/, "v");

if (!accessToken) {
  console.error("Instagram webhook subscription failed: access token is not configured.");
  process.exit(1);
}

const baseUrl = `https://graph.instagram.com/${version}`;
const headers = { Authorization: `Bearer ${accessToken}` };

const accountResponse = await fetch(`${baseUrl}/me?fields=id`, { headers });
const account = await accountResponse.json().catch(() => ({}));
if (!accountResponse.ok || typeof account.id !== "string") {
  reportFailure("resolve Instagram account", accountResponse.status, account.error);
  process.exit(1);
}

const subscription = new URLSearchParams({ subscribed_fields: "messages" });
const subscriptionResponse = await fetch(`${baseUrl}/${encodeURIComponent(account.id)}/subscribed_apps`, {
  method: "POST",
  headers: { ...headers, "Content-Type": "application/x-www-form-urlencoded" },
  body: subscription,
});
const result = await subscriptionResponse.json().catch(() => ({}));
if (!subscriptionResponse.ok || result.success !== true) {
  reportFailure("subscribe Instagram account to messages", subscriptionResponse.status, result.error);
  process.exit(1);
}

console.log("Instagram account is subscribed to the messages webhook.");

function reportFailure(operation, status, error) {
  const code = Number.isInteger(error?.code) ? `, Graph API code ${error.code}` : "";
  const type = typeof error?.type === "string" ? ` (${error.type})` : "";
  console.error(`Could not ${operation}: HTTP ${status}${code}${type}.`);
}
