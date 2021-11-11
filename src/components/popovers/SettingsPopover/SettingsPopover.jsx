import React, { useContext } from "react";
import Popover from "../PopoverContainer/PopoverContainer";
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToggle,
} from "@ionic/react";
import { attachOutline, helpCircleOutline } from "ionicons/icons";
import {
  toggleDocuments,
  toggleHelp,
} from "../../../firebase/queries/userQueries";
import { GlobalContext } from "../../../App";

const SettingsPopover = (props) => {
  const { user, help, setHelp, documents, setDocuments } =
    useContext(GlobalContext);

  return (
    <Popover {...props}>
      <IonTitle className={"ion-no-padding mb-4"}>Settings</IonTitle>
      <p className={"mb-2"}>You can toggle the features below on or off.</p>
      <IonList data-testid={"settings-popover"}>
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
