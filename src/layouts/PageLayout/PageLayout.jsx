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
import { useHistory, useLocation } from "react-router";
import firebase from "../../firebase/firebase";
import LogoutButton from "../../components/buttons/LogoutButton/LogoutButton";
import { cloneElement, useContext, useEffect, useState } from "react";
import { addOutline, arrowBackOutline } from "ionicons/icons";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../../App";
import HelpButton from "../../components/buttons/HelpButton/HelpButton";

export default ({
  privateRoute,
  title,
  children,
  showBack,
  showAdd,
  payloadTitle,
  helpComponent,
}) => {
  const history = useHistory();
  const location = useLocation();
  const { user, loading, help } = useContext(GlobalContext);
  const [loaded, setLoaded] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [isPopped, setPopped] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const payload = history.location.state;
  useEffect(() => {
    if (!loading) {
      setLoaded(true);
      if (user || !privateRoute) {
        setAuthed(true);
      }
    }
  }, [user, loading, history, location]);
  return (
    loaded && (
      <div>
        {authed ? (
          <IonPage data-testid="layout">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton />
                  <IonTitle className="text-2xl text-gray-800">
                    {payloadTitle ? payload?.title : title}
                  </IonTitle>
                </IonButtons>
                <IonButtons slot="end" className="mr-0 sm:mr-3">
                  {showBack && (
                    <IonFabButton
                      slot="end"
                      className="h-9 w-9"
                      size="small"
                      onClick={() => {
                        history.back();
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
                  {helpComponent && <HelpButton setShowHelp={setShowHelp} />}
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
              <div className=" sm:px-6 flex-grow h-full">
                {cloneElement(children, {
                  showHelp: showHelp,
                  setShowHelp: setShowHelp,
                  isPopped: isPopped,
                  setPopped: setPopped,
                  jobDetails: history.location.state?.jobDetails,
                })}
              </div>
            </IonContent>
          </IonPage>
        ) : (
          <Redirect to={"/welcome"} />
        )}
      </div>
    )
  );
};
