import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase";

export const updateEmail = () => {
  const [user, loading] = useAuthState(firebase.auth());
  user.updateEmail();
};
