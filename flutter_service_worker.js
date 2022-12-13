'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "8864da21819288104d177526032a3430",
"assets/assets/images/akbank_logo.png": "86ab7c3126f2ae01c8f5349d3ceffdac",
"assets/assets/images/albaraka_turk_logo.png": "742a9b805e20820b621fc725712765cb",
"assets/assets/images/altinlogo.png": "4ea950fdc2d15fd9c8a925707e472cd3",
"assets/assets/images/denizbank_logo.png": "18b54d1001a3dd4942ba427a3a48a36d",
"assets/assets/images/doviz.png": "c1a74d16e5bda807970bceafb06d50d3",
"assets/assets/images/enpara_logo.png": "9a688ef59aec19e910c7683eb34e4b86",
"assets/assets/images/garanti_bbva_logo.png": "35628d362b66c0422c740443cb1d9a39",
"assets/assets/images/harem_altin_logo.png": "207a6b4a22a200130075f7e08bfeab26",
"assets/assets/images/hsbc_logo.png": "067323aec506252e48341cc684a3be64",
"assets/assets/images/ing_bank_logo.png": "de1ca233d65076f77455694e33aae5cf",
"assets/assets/images/isbankasi_logo.png": "76a1851184ceefe1c8bd57ff2333e98f",
"assets/assets/images/kuveyt_turk_senin_bankan_logo.png": "a1e6e7dbc49e7506c6a7215c391ae0fe",
"assets/assets/images/merkez_bankasi_logo.png": "5428e998435c2404d9106efb9b84a45a",
"assets/assets/images/qnb_finansbank_logo.png": "5a4ae4cd6ebff81f14460d7a0ebcbdd6",
"assets/assets/images/ramzeylogo.png": "24491e2afd5d3cd6af8698fc1d316fed",
"assets/assets/images/sekerbank_logo.png": "926c7ddcb4062a6fb3c78d830b74aa41",
"assets/assets/images/serbest_piyasa_logo.png": "dbac70917e28dd503fb3fe0557164659",
"assets/assets/images/turkiye_finans_logo.png": "cc33c1ba281a1657c0e5d54cb19e9e47",
"assets/assets/images/vakifbank_logo.png": "61605487adcdba64a6451ccde77017ae",
"assets/assets/images/vakif_katilim_logo.png": "962a45223cca9955a3b4b33160551dc7",
"assets/assets/images/yapikredi_logo.png": "e4153c36d53281c08bff5ee96a50129a",
"assets/assets/images/ziraat_bankasi_logo.png": "f79f49310c63bf004fd06d0d20185dc9",
"assets/assets/images/ziraat_katilim_logo.png": "75a4c5aa7caf8d8817333456da5d0bec",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "7a09e67636efc811f1e02f2af768c676",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/shaders/ink_sparkle.frag": "6333b551ea27fd9d8e1271e92def26a9",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"firebase-messaging-sw.js": "9b6394e18e089509d379fe8fca1c2ac3",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "c0ed3fced736f784f6fbf79ea21c0166",
"/": "c0ed3fced736f784f6fbf79ea21c0166",
"indexyedek.html": "aece91a07ba5da450c7ba167752579cc",
"main.dart.js": "9252912cc1d3dd223c9b0cb3a024cb41",
"manifest.json": "48f45245718a35a66d7c83a3d2c2c7a4",
"version.json": "294b46cf624b02c74c10dfbf858ef5c9"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
