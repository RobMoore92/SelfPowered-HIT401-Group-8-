import "./PageLayout.css";
import {
  IonButtons,
  IonContent,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import firebase from "../../firebase/firebase";
import LogoutButton from "../../components/buttons/LogoutButton/LogoutButton";
import { cloneElement, useEffect, useState } from "react";
import { addOutline, arrowBackOutline } from "ionicons/icons";
import { Redirect } from "react-router-dom";

export default ({
  privateRoute,
  title,
  children,
  showBack,
  showAdd,
  payloadTitle,
}) => {
  const history = useHistory();
  const [user, loading] = useAuthState(firebase.auth());
  const [isPopped, setPopped] = useState(false);
  const payload = history.location.state?.payload;
  return user && privateRoute ? (
    <IonPage data-testid="layout">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonTitle className="text-2xl text-gray-800">
              {payloadTitle ? payload.title : title}
            </IonTitle>
          </IonButtons>
          <IonButtons slot="end" className="mr-0 sm:mr-3">
            {showBack && (
              <IonFabButton
                slot="end"
                className="h-9 w-9"
                size="small"
                onClick={() => {
                  history.goBack();
                }}
              >
                <IonIcon icon={arrowBackOutline} />
              </IonFabButton>
            )}
            {showAdd && (
              <IonFabButton
                slot="end"
                className="h-9 w-9"
                size="small"
                onClick={() => {
                  setPopped(true);
                }}
              >
                <IonIcon icon={addOutline} />
              </IonFabButton>
            )}
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
        <div className=" sm:px-6 flex-grow">
          {cloneElement(children, {
            isPopped: isPopped,
            setPopped: setPopped,
            jobDetails: history.location.state?.jobDetails,
          })}
        </div>
      </IonContent>
    </IonPage>
  ) : (
    <Redirect to={"/welcome"} />
  );
};
