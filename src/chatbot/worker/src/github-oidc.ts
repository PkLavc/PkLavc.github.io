const GITHUB_OIDC_ISSUER = "https://token.actions.githubusercontent.com";
const GITHUB_OIDC_JWKS = "https://token.actions.githubusercontent.com/.well-known/jwks";
const EXPECTED_AUDIENCE = "https://api.pklavc.com/tiktok/publish";
const EXPECTED_REPOSITORIES = new Set([
  "PkLavc/PkLavc.github.io",
]);
const EXPECTED_REF = "refs/heads/main";
const EXPECTED_WORKFLOW_REFS = new Set([
  "PkLavc/PkLavc.github.io/.github/workflows/private-blog-social.yml@refs/heads/main",
  "PkLavc/PkLavc.github.io/.github/workflows/tiktok-sandbox-test.yml@refs/heads/main",
]);

type JwtHeader = {
  alg?: string;
  kid?: string;
  typ?: string;
};

type GithubOidcClaims = {
  iss?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  repository?: string;
  ref?: string;
  workflow_ref?: string;
  event_name?: string;
  [key: string]: unknown;
};

type JwkWithKid = JsonWebKey & { kid?: string };

type Jwks = {
  keys?: JwkWithKid[];
};

export async function verifyGithubActionsOidc(request: Request): Promise<GithubOidcClaims> {
  const authorization = request.headers.get("Authorization") || "";
  if (!authorization.startsWith("Bearer ")) {
    throw new Error("github_oidc_missing");
  }

  const token = authorization.slice("Bearer ".length).trim();
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("github_oidc_invalid");
  }

  let header: JwtHeader;
  let claims: GithubOidcClaims;
  try {
    header = JSON.parse(decodeText(parts[0])) as JwtHeader;
    claims = JSON.parse(decodeText(parts[1])) as GithubOidcClaims;
  } catch {
    throw new Error("github_oidc_invalid");
  }

  if (header.alg !== "RS256" || !header.kid) {
    throw new Error("github_oidc_algorithm_invalid");
  }

  const jwksResponse = await fetch(GITHUB_OIDC_JWKS, {
    headers: { Accept: "application/json" },
    cf: { cacheTtl: 3600, cacheEverything: true },
  } as RequestInit);
  if (!jwksResponse.ok) {
    throw new Error("github_oidc_jwks_unavailable");
  }

  const jwks = await jwksResponse.json() as Jwks;
  const jwk = (jwks.keys || []).find((candidate) => candidate.kid === header.kid);
  if (!jwk) {
    throw new Error("github_oidc_key_unknown");
  }

  const key = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  );

  const signed = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
  const signature = decodeBase64Url(parts[2]);
  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    signature.buffer as ArrayBuffer,
    signed.buffer as ArrayBuffer,
  );
  if (!valid) {
    throw new Error("github_oidc_signature_invalid");
  }

  validateClaims(claims);
  return claims;
}

function validateClaims(claims: GithubOidcClaims): void {
  const now = Math.floor(Date.now() / 1000);
  const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud || ""];

  if (claims.iss !== GITHUB_OIDC_ISSUER) {
    throw new Error("github_oidc_issuer_invalid");
  }
  if (!audience.includes(EXPECTED_AUDIENCE)) {
    throw new Error("github_oidc_audience_invalid");
  }
  if (!claims.exp || claims.exp <= now - 30) {
    throw new Error("github_oidc_expired");
  }
  if (claims.nbf && claims.nbf > now + 30) {
    throw new Error("github_oidc_not_yet_valid");
  }
  if (!EXPECTED_REPOSITORIES.has(String(claims.repository || ""))) {
    throw new Error("github_oidc_repository_invalid");
  }
  if (claims.ref !== EXPECTED_REF) {
    throw new Error("github_oidc_ref_invalid");
  }
  if (!EXPECTED_WORKFLOW_REFS.has(String(claims.workflow_ref || ""))) {
    throw new Error("github_oidc_workflow_invalid");
  }
  if (!["workflow_dispatch", "schedule", "push"].includes(String(claims.event_name || ""))) {
    throw new Error("github_oidc_event_invalid");
  }
}

function decodeText(value: string): string {
  return new TextDecoder().decode(decodeBase64Url(value));
}

function decodeBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 ? "=".repeat(4 - (normalized.length % 4)) : "";
  const decoded = atob(normalized + padding);
  const bytes = new Uint8Array(decoded.length);
  for (let index = 0; index < decoded.length; index += 1) {
    bytes[index] = decoded.charCodeAt(index);
  }
  return bytes;
}
