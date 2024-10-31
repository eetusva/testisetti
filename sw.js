self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('ressukisalaskuri-cache').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './aes.js',
        './app.js',
        './bck-grnd.jpg',
        './bck-grnd2.png',
        './db.js',
        './etusivu.js',
        './haku.js',
        './info.js',
        './kilpailijanluonti.html',
        './kisanluonti.html',
        './kisanluonti.js',
        './main.js',
        './Näyttötehtävä.txt',
        './pisteet.js',
        './README.md',
        './ressulaskuri.jpg',
        './style_testi.css',
        './styles.css',
        './styles_etusivu.css',
        './tag.png',
        './tallenna.js',
        './tulokset.html',
        './tulokset.js'
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
