const CACHE = 'mindlab-v54';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => {
        // Force reload all open tabs to get fresh HTML
        clients.forEach(client => client.navigate(client.url));
      })
  );
  self.clients.claim();
});

// Network-first: всегда берём свежую версию, кэш только при офлайн
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(resp => {
      const clone = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return resp;
    }).catch(() => caches.match(e.request))
  );
});
