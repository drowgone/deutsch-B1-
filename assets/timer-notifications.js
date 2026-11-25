self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = event.notification.data?.url;
  if (!url) return;
  event.waitUntil((async () => {
    const pages = await self.clients.matchAll({type:"window",includeUncontrolled:true});
    const page = pages.find(client => client.url === url);
    return page ? page.focus() : self.clients.openWindow(url);
  })());
});
