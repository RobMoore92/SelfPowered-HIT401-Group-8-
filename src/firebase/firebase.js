import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";
import "firebase/storage";

const config = {
  databaseURL: "https://hit401-93f42.firebaseio.com",
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSENGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

//stops firebase trying to initialize twice

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  firebase
    .firestore()
    .settings({ experimentalForceLongPolling: true, merge: true });
  if (process.env.NODE_ENV !== "test") {
    firebase
      .firestore()
      .enablePersistence()
      .catch((err) => {
        if (err.code == "failed-precondition") {
          console.log("failed");
        } else if (err.code == "unimplemented") {
          console.log("unimplemented");
        }
      });
  }
} else {
  firebase.app();
}
export const db = firebase.firestore();
export const auth = firebase.auth();
export const messaging = firebase.messaging();
export const storage = firebase.storage();

export default firebase;
