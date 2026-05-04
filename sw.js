const CACHE_NAME = 'dings-devlog-cache-v8'; // 首页高级感重塑版本
const urlsToCache = [
  '/',
  '/offline.html' // 建议添加一个离线页面
];

// 安装阶段
self.addEventListener('install', event => {
  self.skipWaiting(); // 强制跳过等待，立即激活新 SW
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 激活阶段：清理旧缓存
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

// 请求阶段：采用 Stale-While-Revalidate 策略
// 优先使用缓存（保证速度），同时后台发起请求更新缓存（保证下次是最新的）
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // 只有成功的 GET 请求才存入缓存
          if (event.request.method === 'GET' && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});
