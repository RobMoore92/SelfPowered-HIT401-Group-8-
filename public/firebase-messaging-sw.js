importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }

firebase.initializeApp({
    apiKey: "AIzaSyCMwUwHTd9zhdCZ3YWFaPFSEiK3Rbh-bf0",
    authDomain: "hit401-93f42.firebaseapp.com",
    projectId: "hit401-93f42",
    storageBucket: "hit401-93f42.appspot.com",
    messagingSenderId: "28560995956",
    appId: "1:28560995956:web:fc886a0343d86741c8c321",
    measurementId: "G-EV7JSXL6CY"
   })

 const initMessaging = firebase.messaging()