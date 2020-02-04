if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/pwa-sw.js')
    .then(function () {
      console.log('service worker registered');
    })
    .catch(function (err) {
      console.warn('service worker failed: ' + err);
    });
}
