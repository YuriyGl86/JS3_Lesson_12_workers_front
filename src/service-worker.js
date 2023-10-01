/* eslint-disable no-restricted-globals */

self.addEventListener('install', (event) => {
  console.log('Установлен'); // eslint-disable-line no-console

  event.waitUntil(
    caches.open('my-best-cache')
      .then((cache) => {
        cache.addAll([
          './',
          'main.css',
          'main.js',
          'index.html',
        ]);
      }),
  );
});

self.addEventListener('activate', () => {
  console.log('Активирован'); // eslint-disable-line no-console
});

// async function cachePriorityThenFetch(event) {
//   const cache = await caches.open('my-best-cache');
//   const cacheResponse = await caches.match(event.request);

//   if (cacheResponse) {
//     return cacheResponse;
//   }

//   let response;

//   try {
//     response = await fetch(event.request);
//   } catch (error) {
//     return;
//   }

//   cache.put(event.request, response.clone());

//   return response;
// }

async function fetchPriorityThenCache(event) {
  let response;

  try {
    response = await fetch(event.request);
  } catch (error) {
    const cacheResponse = await caches.match(event.request);

    if (cacheResponse) {
      return cacheResponse;
    }

    return new Response('Нет соединения');
  }

  const cache = await caches.open('my-best-cache');

  cache.put(event.request, response.clone());

  return response;
}

self.addEventListener('fetch', (event) => {
  console.log('Происходит запрос на сервер'); // eslint-disable-line no-console

  const url = new URL(event.request.url);

  // if (FETCH_PRIORITY_URLS.includes(url.pathname)) {
  //   event.respondWith(fetchPriorityThenCache(event));

  //   return;
  // }

  if (!url.pathname.startsWith('/api/news/')) {
    event.respondWith(fetchPriorityThenCache(event));
  }

  // event.respondWith(cachePriorityThenFetch(event));
  // event.respondWith(fetchPriorityThenCache(event));
});
