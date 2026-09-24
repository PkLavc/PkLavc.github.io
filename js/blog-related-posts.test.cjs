const assert = require("node:assert/strict");
const { select } = require("./blog-related-posts.js");

const posts = [
  { title: "Current", url: "/blog/current/", date: "2026-09-24", category: "AI", tags: ["Gemini", "API"] },
  { title: "Old shared tags", url: "/blog/old-shared/", date: "2024-01-01", category: "Other", tags: ["Gemini", "API"] },
  { title: "Category match", url: "/blog/category-match/", date: "2025-01-01", category: "AI", tags: ["Python"] },
  { title: "Newest no match", url: "/blog/newest/", date: "2026-09-23", category: "Other", tags: ["Cloud"] },
  { title: "Second newest", url: "/blog/second/", date: "2026-09-22", category: "Else", tags: [] },
  { title: "Third newest", url: "/blog/third/", date: "2026-09-21", category: "Else", tags: [] },
  { title: "Missing link", url: "javascript:alert(1)", date: "2026-09-25", category: "AI", tags: ["Gemini"] }
];

let result = select(posts, "/blog/current/");
assert.deepEqual(result.latest.map((post) => post.title), ["Newest no match", "Second newest", "Third newest"]);
assert.ok(!result.latest.some((post) => post.url === "/blog/current/"));
assert.deepEqual(result.related.map((post) => post.title), ["Old shared tags", "Category match", "Newest no match"]);
assert.ok(!result.related.some((post) => post.url === "/blog/current/"));

const noTagMatch = posts.map((post) => post.url === "/blog/current/" ? { ...post, tags: ["No overlap"] } : post);
result = select(noTagMatch, "/blog/current/");
assert.equal(result.related[0].title, "Category match");

const noTagOrCategory = posts.map((post) => post.url === "/blog/current/" ? { ...post, tags: ["No overlap"], category: "Unavailable" } : post);
result = select(noTagOrCategory, "/blog/current/");
assert.deepEqual(result.related.map((post) => post.title), ["Newest no match", "Second newest", "Third newest"]);
console.log("blog-related-posts tests passed");
