import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonTitle,
  IonText,
} from "@ionic/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import firebase from "../../firebase/firebase";
import LogoutButton from "../../components/buttons/LogoutButton/LogoutButton";
import { useEffect } from "react";

export default ({ title, children }) => {
  const history = useHistory();
  const [user] = useAuthState(firebase.auth());
  console.log(useAuthState(firebase.auth()))
  useEffect(() => {
    if (!user) {
      history.push("/welcome");
    }
  }, [user]);
  return (
    <IonPage data-testid="layout">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonTitle>{title}</IonTitle>
          </IonButtons>
          <IonButtons slot="end">
            {user && <LogoutButton />}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">123</IonTitle>
          </IonToolbar>
        </IonHeader>
        {children}
      </IonContent>
    </IonPage>
  );
};
