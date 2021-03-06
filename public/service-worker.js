/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v7';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/offline.html',
  '/index.html',
  '/assets/js/install.js',
  '/assets/css/style.css',
  '/assets/images/catter.svg',
  '/assets/images/catter.png',
  '/assets/images/smile.png',
  '/assets/images/install.svg',
  '/assets/media/plop.mp3'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
	);

  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
  if (evt.request.mode !== 'navigate') {
		// Not a page navigation, bail.
		return;
	}
  evt.respondWith(
		fetch(evt.request)
			.catch(() => {
				return caches.open(CACHE_NAME)
					.then((cache) => {
						return cache.match('/offline.html');
					});
      })
		);
});

// ========================================================================>
// push notifications

// self.addEventListener('notificationclose', function(e) {
//   var notification = e.notification;
//   var primaryKey = notification.data.primaryKey;

//   console.log('Closed notification: ' + primaryKey);
// });


// self.addEventListener('notificationclick', function(e) {
//   var notification = e.notification;
//   var primaryKey = notification.data.primaryKey;
//   var action = e.action;

//   if (action === 'close') {
//     notification.close();
//   } else {
//     clients.openWindow('http://www.example.com');
//     notification.close();
//   }
// });

// self.addEventListener('push', function(e) {
//   var options = {
//     body: 'This notification was generated from a push!',
//     icon: '/assets/images/smile.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: '2'
//     },
//     actions: [
//       {action: 'explore', title: 'Explore this new world',
//         icon: '/assets/images/smile.png'},
//       {action: 'close', title: 'Close',
//         icon: '/assets/images/smile.png'},
//     ]
//   };
//   e.waitUntil(
//     self.registration.showNotification('Hello world!', options)
//   );
// });