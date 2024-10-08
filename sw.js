self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('ressulaskuri-cache').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles_etusivu.css',
          '/ressulaskuri.jpg',
          '/kilpailu.html',
          '/kilpailijanluonti.html',
          '/laskuri.html',
          '/tulokset.html',
          '/icon192.png',
          '/icon512.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  