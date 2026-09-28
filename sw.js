// Made by tools/publish-site.mjs. Keeps Dusk Hunt on the device: instant repeat visits, and play offline.
// The page: from the network first (so a new day's animal shows up), the stored copy when offline.
// The code and fonts: stored at install (the code's name changes whenever it does).
// Icons and pictures: stored, refreshed in the background.
// Recordings and Wikipedia photos (other sites, fetched with CORS): stored once; their addresses never change.
const VERSION = "4206f2753fdd";
const SHELL = "dh-shell-" + VERSION;
const ART = "dh-art-v1";
const MEDIA = "dh-media-v1";
const MEDIA_MAX = 60;
const PRECACHE = ["./","js/app-y43yxmns.js","js/chunk-88xha0ya.js","js/chunk-kzx8gzkn.js","js/chunk-w0bf6mtc.js","manifest.webmanifest","icon.svg","fonts/dm-mono-normal-400-latin.woff2","fonts/dm-mono-normal-500-latin.woff2","fonts/dm-sans-normal-400-700-latin.woff2","fonts/fraunces-italic-400-latin.woff2","fonts/fraunces-normal-600-latin.woff2","fonts/fraunces-title.woff2"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("dh-shell-") && k !== SHELL).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function fromNetwork(req, cacheName) {
  const res = await fetch(req);
  // Never store opaque answers: they can't be checked, and each one costs megabytes of quota.
  if (res.ok && (res.type === "basic" || res.type === "cors")) {
    const copy = res.clone();
    caches.open(cacheName).then((c) => c.put(req, copy)).then(() => cacheName === MEDIA && trim());
  }
  return res;
}
async function trim() {
  const c = await caches.open(MEDIA);
  const keys = await c.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - MEDIA_MAX)).map((k) => c.delete(k)));
}
const stored = (req, cacheName) => caches.open(cacheName).then((c) => c.match(req));

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) {
    if (req.mode === "cors" && /(^|\.)(wikimedia|wikipedia)\.org$/.test(url.hostname)) {
      e.respondWith(stored(req, MEDIA).then((hit) => hit || fromNetwork(req, MEDIA)));
    }
    return;
  }
  if (req.mode === "navigate") {
    // Network first, but don't keep a slow connection waiting more than 3 s.
    e.respondWith(
      Promise.race([fromNetwork(req, SHELL), new Promise((_, no) => setTimeout(no, 3000))])
        .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("./")).then((r) => r || fetch(req))),
    );
    return;
  }
  const path = url.pathname;
  if (/\/js\/(app|chunk)-[\w-]+\.js$/.test(path) || /\/fonts\//.test(path)) {
    e.respondWith(caches.match(req).then((r) => r || fromNetwork(req, SHELL)));
    return;
  }
  if (/\.(png|jpg|svg|webmanifest)$/.test(path)) {
    // Stale while revalidate: the stored copy now, a fresh one for next time.
    e.respondWith(
      stored(req, ART).then((hit) => {
        const fresh = fromNetwork(req, ART).catch(() => hit);
        return hit || fresh;
      }),
    );
  }
});
