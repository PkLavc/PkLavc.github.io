/* PKLAVC Web Push: no fetch interception or page caching. */
self.addEventListener("push", event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch { data = {}; }
  const title = typeof data.title === "string" ? data.title.slice(0, 110) : "PKLAVC";
  const destination = typeof data.url === "string" && /^\/(blog|store)\//.test(data.url) ? data.url : "/blog/";
  event.waitUntil(self.registration.showNotification(title, {
    body: typeof data.body === "string" ? data.body.slice(0, 180) : "",
    icon: "/images/icons/icon-192.png",
    badge: "/images/icons/favicon-32.png",
    tag: typeof data.tag === "string" ? data.tag.slice(0, 120) : "",
    data: { url: destination }
  }));
});
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const relative = event.notification.data && event.notification.data.url;
  const destination = new URL(typeof relative === "string" ? relative : "/blog/", self.location.origin).href;
  event.waitUntil((async () => {
    const clientsList = await clients.matchAll({ type: "window", includeUncontrolled: true });
    const found = clientsList.find(c => c.url === destination);
    if (found) return found.focus();
    return clients.openWindow(destination);
  })());
});
