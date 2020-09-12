const staticCacheName = "site-static-v1";
const assets = ["/", "index.html", "app.js", "styles.css", "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=341f3a5ad73fcf20c2dee19a9f0b6b90&units${x},${y}&units=metric", "http://openweathermap.org/img/wn/01d@2x.png"];
self.addEventListener("install", (evt) => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            cache.addAll(assets);
        })
    );
    self.skipWaiting();
});
self.addEventListener("activate", (evt) => {
    evt.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.filter((key) => key !== staticCacheName).map((key) => caches.delete(key)));
        })
    );
    self.clients.claim();
});
self.addEventListener("fetch", (evt) => {
    evt.respondWith(
        caches.match(evt.request).then((cacheRes) => {
            return cacheRes || fetch(evt.request);
        })
    );
});
