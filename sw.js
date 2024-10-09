const CACHE_NAME = 'ressukisa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/kilpailu.html',
  '/kilpailijanluonti.html',
  '/laskuri.html',
  '/tulokset.html',
  '/styles_etusivu.css',
  '/kisanluonti.js',
  '/ressulaskuri.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response; // Palauta välimuistista
        }
        return fetch(event.request); // Tee verkkopyyntö, jos ei ole välimuistissa
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Poista vanhat välimuistit
          }
        })
      );
    })
  );
});
