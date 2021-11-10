import "./PageLayout.css";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import { cloneElement, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../../App";
import LogoutButton from "../../components/buttons/LogoutButton/LogoutButton";
import HelpButton from "../../components/buttons/HelpButton/HelpButton";
import BackButton from "../../components/buttons/BackButton/BackButton";
import AddButton from "../../components/buttons/AddButton/AddButton";

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
  const { user, loading } = useContext(GlobalContext);
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
                  {showBack && <BackButton />}
                  {showAdd && <AddButton setPopped={setPopped} />}
                  {helpComponent && <HelpButton setShowHelp={setShowHelp} />}
                  {user && <LogoutButton />}
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
              <div className="px-2 sm:px-6 flex-grow h-full">
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
