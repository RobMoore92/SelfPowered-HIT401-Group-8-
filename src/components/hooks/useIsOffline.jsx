import { useEffect, useState } from "react";
import firebase from "../../firebase/firebase";

const useIsOnline = () => {
  const [isOnline, setNetwork] = useState(window.navigator.onLine);
  const updateNetwork = () => {
    const online = window.navigator.onLine;
    if (online) {
      console.log("online");
      firebase
        .firestore()
        .enableNetwork()
        .then(() => {
          setNetwork(online);
          window.location.reload();
        });
    } else {
      console.log("offline");
      firebase
        .firestore()
        .disableNetwork()
        .then(() => {
          setNetwork(!online);
          window.location.reload();
        });
    }
  };
  useEffect(() => {
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
    return () => {
      window.removeEventListener("offline", updateNetwork);
      window.removeEventListener("online", updateNetwork);
    };
  }, []);
  return isOnline;
};

export default useIsOnline;
