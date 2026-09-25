const assert = require('node:assert/strict');
const { select } = require('../../js/blog-related-posts.js');

const posts = [
  { title: 'Current', url: '/blog/current/', date: '2026-09-20', category: 'AI', tags: ['alpha', 'beta'] },
  { title: 'Two shared tags', url: '/blog/tag-match/', date: '2024-01-01', category: 'Other', tags: ['alpha', 'beta', 'gamma'] },
  { title: 'One shared tag', url: '/blog/one-tag/', date: '2026-09-19', category: 'Other', tags: ['alpha'] },
  { title: 'Category match', url: '/blog/category-match/', date: '2026-09-18', category: 'AI', tags: ['unrelated'] },
  { title: 'Recent fallback', url: '/blog/recent/', date: '2026-09-23', category: 'Other', tags: ['none'] },
  { title: 'Duplicate URL ignored', url: '/blog/recent', date: '2026-09-22', category: 'AI', tags: ['alpha'] },
];
const result = select(posts, '/blog/current/');
assert.equal(result.latest.length, 3);
assert.deepEqual(result.latest.map(post => post.title), ['Recent fallback', 'One shared tag', 'Category match']);
assert.ok(!result.latest.some(post => post.url === '/blog/current/'));
assert.equal(new Set(result.related.map(post => post.url)).size, result.related.length);
assert.ok(!result.related.some(post => post.url === '/blog/current/'));
assert.equal(result.related[0].title, 'Two shared tags');
assert.equal(result.related[1].title, 'One shared tag');
assert.equal(result.related[2].title, 'Category match');

const noRelations = select([
  { title: 'Current', url: '/blog/current/', date: '2026-09-20', category: 'A', tags: ['x'] },
  { title: 'Older', url: '/blog/old/', date: '2020-01-01', category: 'B', tags: ['y'] },
  { title: 'Newer', url: '/blog/new/', date: '2026-09-19', category: 'C', tags: ['z'] },
], '/blog/current/');
assert.deepEqual(noRelations.related.map(post => post.title), ['Newer', 'Older']);
console.log('Latest/Related selection tests passed.');
