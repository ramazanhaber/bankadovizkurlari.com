<html>
<body>
 
  <script src="main.dart.js" type="application/javascript"></script>
  <script>
       if ('serviceWorker' in navigator) {
          // Service workers are supported. Use them.
          window.addEventListener('load', function () {
            // ADD THIS LINE
            navigator.serviceWorker.register('/firebase-messaging-sw.js', { type: 'module' });

            // Wait for registration to finish before dropping the <script> tag.
            // Otherwise, the browser will load the script multiple times,
            // potentially different versions.
            var serviceWorkerUrl = 'flutter_service_worker.js?v=' + serviceWorkerVersion;

           
          });
      }
  </script>