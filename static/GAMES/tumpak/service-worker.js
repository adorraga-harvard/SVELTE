
self.addEventListener("install", (event) => {
  console.log("Service Worker: Install");

  event.waitUntil(
    caches.open("tumpak-v1").then((cache) =>
      cache.addAll([
        "/GAMES/tumpak/",
        "/img/tumpak.png",
        // Add more game assets if you want them offline
      ])
    )
  );
});

self.addEventListener("fetch", (event) => {
  // Only intercept requests under /GAMES/tumpak/
  if (event.request.url.includes("/GAMES/tumpak/")) {
    event.respondWith(
      caches.match(event.request).then(
        (response) => response || fetch(event.request)
      )
    );
  }
});
