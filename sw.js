const CACHE_NAME = 'pager-respect-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

// تثبيت
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// جلب البيانات
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// تحديث
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

---

## الملفات النهائية في Repository:
```
📁 pager-respect/
  ├── index.html  ✅ (الموقع)
  ├── manifest.json  ✅ (معلومات التطبيق)
  └── sw.js  ✅ (يخلي الموقع يشتغل بدون نت)
