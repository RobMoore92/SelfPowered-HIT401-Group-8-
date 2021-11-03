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
            <IonHeader className={"bg-transparent"}>
              <IonToolbar color={"none"} className={""}>
                <div className={"flex items-center"}>
                  <IonMenuButton color={"dark"} />

                  <IonTitle className="text-2xl ml-2 font-medium text-gray-100 line-clamp-1">
                    {payloadTitle ? payload?.title : title}
                  </IonTitle>
                </div>

                <IonButtons slot="end" className="mr-0 sm:mr-3">
                  {showBack && (
                    <IonFabButton
                      style={{ "--background": "#e6e6e6" }}
                      slot="end"
                      className="menu-button"
                      size="small"
                      onClick={() => {
                        history.back();
                      }}
                    >
                      <IonIcon
                        className={"menu-button-icon text-gray-700"}
                        icon={arrowBackOutline}
                      />
                    </IonFabButton>
                  )}
                  {showAdd && (
                    <IonFabButton
                      style={{ "--background": "#46d530" }}
                      slot="end"
                      className="menu-button"
                      size="small"
                      onClick={() => {
                        setPopped(true);
                      }}
                    >
                      <IonIcon
                        className={"menu-button-icon"}
                        icon={addOutline}
                      />
                    </IonFabButton>
                  )}
                  {helpComponent && <HelpButton setShowHelp={setShowHelp} />}
                  {user && <LogoutButton />}
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
              <div className=" sm:px-6 flex-grow h-full">
                {cloneElement(children, {
                  showHelp: showHelp,
                  setShowHelp: setShowHelp,
                  isPopped: isPopped,
                  setPopped: setPopped,
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
