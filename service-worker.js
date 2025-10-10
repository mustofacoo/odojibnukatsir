// Service Worker untuk One Day One Juz App
const CACHE_NAME = 'odoj-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/supabase.js',
  '/tampilan.css',
  '/manifest.json',
  '/icon-180x180.png',
  '/icon-192x192.png',
  '/icon-512x512.png',
  // CDN yang digunakan
  'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.7/dist/umd/supabase.min.js'
];

// Install Service Worker dan cache semua file
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting(); // Activate immediately
      })
      .catch(error => {
        console.error('❌ Service Worker: Installation failed', error);
      })
  );
});

// Activate Service Worker dan hapus cache lama
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Activation complete');
      return self.clients.claim(); // Take control immediately
    })
  );
});

// Fetch Strategy: Network First, fallback to Cache
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.includes('unpkg.com') &&
      !event.request.url.includes('cdn.tailwindcss.com') &&
      !event.request.url.includes('cdn.jsdelivr.net')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone response karena response hanya bisa digunakan sekali
        const responseToCache = response.clone();
        
        // Update cache dengan response terbaru
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      })
      .catch(() => {
        // Jika network gagal, gunakan cache
        return caches.match(event.request).then(response => {
          if (response) {
            console.log('📦 Service Worker: Serving from cache:', event.request.url);
            return response;
          }
          
          // Jika tidak ada di cache, return offline page
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Background Sync (untuk sync data saat online kembali)
self.addEventListener('sync', event => {
  console.log('🔄 Service Worker: Background sync triggered');
  if (event.tag === 'sync-checks') {
    event.waitUntil(syncChecksToSupabase());
  }
});

// Function untuk sync data ke Supabase
async function syncChecksToSupabase() {
  console.log('🔄 Service Worker: Syncing checks to Supabase...');
  // Data akan di-sync otomatis oleh app.js saat online
  // Service Worker hanya trigger event
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'SYNC_REQUIRED',
      message: 'Please sync data to Supabase'
    });
  });
}

// Push Notifications (optional - untuk reminder)
self.addEventListener('push', event => {
  console.log('🔔 Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Jangan lupa baca Al-Qur\'an hari ini!',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [200, 100, 200],
    tag: 'odoj-reminder',
    requireInteraction: false
  };
  
  event.waitUntil(
    self.registration.showNotification('One Day One Juz', options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', event => {
  console.log('🔔 Service Worker: Notification clicked');
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('✅ Service Worker: Loaded successfully');