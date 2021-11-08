import React, { useContext, useEffect } from "react";
import Popover from "./PopoverContainer/PopoverContainer";
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToggle,
} from "@ionic/react";
import { attachOutline, helpCircleOutline } from "ionicons/icons";
import { useLocation } from "react-router";
import {
  getUserData,
  toggleDocuments,
  toggleHelp,
} from "../../firebase/queries/userQueries";
import { GlobalContext } from "../../App";

const SettingsPopover = (props) => {
  const { user, help, setHelp, documents, setDocuments } =
    useContext(GlobalContext);
  const { refresh, setRefresh } = props;
  const location = useLocation();

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((snap) => {
        const results = snap.data();
        setHelp(results?.help);
        setDocuments(results?.documents);
        setRefresh(!refresh);
      });
    }
  }, [location, user]);
  return (
    <Popover {...props}>
      <IonTitle className={"ion-no-padding mb-4"}>Settings</IonTitle>
      <IonList>
        <IonItem className={"text-gray-700"}>
          <div className={"flex justify-between w-full items-center"}>
            <div className={"flex items-center space-x-2"}>
              <IonIcon className={"text-2xl"} icon={helpCircleOutline} />
              <IonLabel className={"text-sm font-medium"}>Show Help</IonLabel>
            </div>
            <IonToggle
              checked={help}
              onIonChange={() => {
                toggleHelp(user.uid, help).then(() => {
                  setHelp(!help);
                });
              }}
            />
          </div>
        </IonItem>
        <IonItem className={"text-gray-700"}>
          <div className={"flex justify-between w-full items-center"}>
            <div className={"flex items-center space-x-2"}>
              <IonIcon className={"text-2xl"} icon={attachOutline} />
              <IonLabel className={"text-sm font-medium"}>
                Show Documents
              </IonLabel>
            </div>
            <IonToggle
              checked={documents}
              onIonChange={() => {
                toggleDocuments(user.uid, documents).then(() => {
                  setDocuments(!documents);
                });
              }}
            />
          </div>
        </IonItem>
      </IonList>
    </Popover>
  );
};

export default SettingsPopover;
