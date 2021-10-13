import "./PageLayout.css";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonTitle,
  IonText,
  IonIcon,
  IonFabButton,
} from "@ionic/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import firebase from "../../firebase/firebase";
import LogoutButton from "../../components/buttons/LogoutButton/LogoutButton";
import { cloneElement, useEffect, useState } from "react";
import { addOutline } from "ionicons/icons";

export default ({ title, children }) => {
  const history = useHistory();
  const [user] = useAuthState(firebase.auth());
  const [addPopped, setAddPopped] = useState(false);
  const clientDetails = history.location.state?.clientDetails;
  const jobDetails = history.location.state?.jobDetails;
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
            <IonTitle className="text-2xl">{clientDetails?.name || jobDetails?.title || title}</IonTitle>
          </IonButtons>
          <IonButtons slot="end" className="mr-0 sm:mr-3">
            <IonFabButton
              slot="end"
              className="h-9 w-9"
              color="tertiary"
              size="small"
              onClick={() => {
                setAddPopped(true)
              }}
            >
              <IonIcon icon={addOutline} />
            </IonFabButton>
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
        <div className=" sm:px-4 h-full">
          {cloneElement(children, { addPopped: addPopped, setAddPopped: setAddPopped, jobDetails: history.location.state?.jobDetails })}
        </div>
      </IonContent>
    </IonPage>
  );
};
