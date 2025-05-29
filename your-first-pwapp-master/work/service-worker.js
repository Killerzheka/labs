// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'weatherData-v1';
var cacheName = 'weatherPWA-final-1';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/work/images/clear.png',
  '/work/images/cloudy-scattered-showers.png',
  '/work/images/cloudy.png',
  '/work/images/fog.png',
  '/work/images/ic_add_white_24px.svg',
  '/work/images/ic_refresh_white_24px.svg',
  '/work/images/partly-cloudy.png',
  '/work/images/rain.png',
  '/work/images/scattered-showers.png',
  '/work/images/sleet.png',
  '/work/images/snow.png',
  '/work/images/thunderstorm.png',
  '/work/images/wind.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
      caches.open(dataCacheName).then(cache =>
          fetch(e.request)
              .then(resp => {
                cache.put(e.request.url, resp.clone());
                return resp;
              })
              .catch(_ => {
                // network failed → return cached version (if any)
                return cache.match(e.request);
              })
      )
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  const dataUrl = 'https://api.open-meteo.com/v1/forecast';

  self.addEventListener('fetch', e => {
    if (e.request.url.startsWith(dataUrl)) {
      // Cache-then-network for weather data
      e.respondWith(
          caches.open(dataCacheName).then(cache =>
              fetch(e.request).then(resp => {
                cache.put(e.request.url, resp.clone());
                return resp;
              })
          )
      );
    } else {
      // App shell strategy unchanged
      e.respondWith(
          caches.match(e.request).then(resp => resp || fetch(e.request))
      );
    }
  });
});
