importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

firebase.initializeApp({
  apiKey: "AIzaSyBCp46KFP98rrFveWAzk4gOG_3z_lJNg84",
  authDomain: "selfprosper-565e2.firebaseapp.com",
  projectId: "selfprosper-565e2",
  storageBucket: "selfprosper-565e2.appspot.com",
  messagingSenderId: "589409701298",
  appId: "1:589409701298:web:fc7db453ada5f76bcca8ab",
  measurementId: "G-G54ZC955KY",
});

const initMessaging = firebase.messaging();
