Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

  function displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'Here is a notification body!',
          icon: '/assets/images/smile.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {action: 'explore', title: 'Explore this new world',
              icon: '/assets/images/smile.png'},
            {action: 'close', title: 'Close notification',
              icon: '/assets/images/smile.png'},
          ]
        };
        reg.showNotification('Hello world!', options);
      });
    }
  }
  displayNotification()


  if ('Notification' in window && navigator.serviceWorker) {
    // Display the UI to let the user toggle notifications
  }

  if (Notification.permission === "granted") {
    /* do our magic */
  } else if (Notification.permission === "blocked") {
   /* the user has previously denied push. Can't reprompt. */
  } else {
    /* show a prompt to the user */
    prompt('works')
  }


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('index.js').then(function(reg) {
      console.log('Service Worker Registered!', reg);
  
      reg.pushManager.getSubscription().then(function(sub) {
        if (sub === null) {
          // Update UI to ask user to register for Push
          console.log('Not subscribed to push service!');
        } else {
          // We have a subscription, update the database
          console.log('Subscription object: ', sub);
        }
      });
    })
     .catch(function(err) {
      console.log('Service Worker registration failed: ', err);
    });
  }

  function subscribeUser() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function(reg) {
  
        reg.pushManager.subscribe({
          userVisibleOnly: true
        }).then(function(sub) {
          console.log('Endpoint URL: ', sub.endpoint);
        }).catch(function(e) {
          if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied');
          } else {
            console.error('Unable to subscribe to push', e);
          }
        });
      })
    }
  }
  subscribeUser()


// random test from here
  self.addEventListener('push', function(e) {
    var body;
  
    if (e.data) {
      body = e.data.text();
    } else {
      body = 'Push message no payload';
    }
  
    var options = {
      body: body,
      icon: 'images/notification-flat.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {action: 'explore', title: 'Explore this new world',
          icon: 'images/checkmark.png'},
        {action: 'close', title: 'I don\'t want any of this',
          icon: 'images/xmark.png'},
      ]
    };
    e.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });


var webPush = require('web-push');

var pushSubscription = {"endpoint":"https://fcm.googleapis.com/fcm/send/c0NI73v1E0Y:APA91bEN7z2weTCpJmcS-MFyfbgjtmlAWuV5YaaNw625_Rq2-f0ZrVLdRPXKGm7B3uwfygicoCeEoWQxCKIxlL3RWG2xkHs6C8-H_cxq-4Z-isAiZ3ixo84-2HeXB9eUvkfNO_t1jd5s","keys":{"p256dh":"BHxSHtYS0q3i0Tb3Ni6chC132ZDPd5uI4r-exy1KsevRqHJvOM5hNX-M83zgYjp-1kdirHv0Elhjw6Hivw1Be5M=","auth":"4a3vf9MjR9CtPSHLHcsLzQ=="}};

var vapidPublicKey = 'BAdXhdGDgXJeJadxabiFhmlTyF17HrCsfyIj3XEhg1j-RmT2wXU3lHiBqPSKSotvtfejZlAaPywJ9E-7AxXQBj4';
var vapidPrivateKey = 'VCgMIYe2BnuNA4iCfR94hA6pLPT3u3ES1n1xOTrmyLw';

var payload = 'Here is a payload!';

var options = {
  vapidDetails: {
    subject: 'mailto:example_email@example.com',
    publicKey: vapidPublicKey,
    privateKey: vapidPrivateKey
  },
  TTL: 60
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);

function generateVAPIDKeys() {
    const vapidKeys = webpush.generateVAPIDKeys();
  
    return {
      publicKey: vapidKeys.publicKey,
      privateKey: vapidKeys.privateKey,
    };
  }

  const publicKey = new Uint8Array([0x4, 0x37, 0x77, 0xfe, ... ]);
serviceWorkerRegistration.pushManager.subscribe(
  {
    userVisibleOnly: true,
    applicationServerKey: publicKey
  }
);