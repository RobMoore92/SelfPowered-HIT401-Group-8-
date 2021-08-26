import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";
const config = {
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
    .enablePersistence()
    .catch((err) => {
      if (err.code == "failed-precondition") {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code == "unimplemented") {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
  firebase.analytics();
} else {
  firebase.app();
}


export default firebase;
