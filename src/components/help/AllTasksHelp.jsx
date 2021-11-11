import React from "react";
import Popover from "../popovers/PopoverContainer/PopoverContainer";
import { IonIcon, IonItem, IonText, IonTitle } from "@ionic/react";
import { helpCircle } from "ionicons/icons";

const TaskHelp = (props) => {
  return (
    <Popover {...props}>
      <div className={"flex items-center space-x-2"}>
        <IonIcon icon={helpCircle} className={"text-2xl text-blue-500"} />
        <IonTitle className={"ion-no-padding"}>Help</IonTitle>
      </div>
      <IonItem lines={"none"}>
        <IonIcon icon={helpCircle} className={"text-2xl text-blue-500"} />
        <IonText className={"ion-no-padding"}>Help</IonText>
      </IonItem>
    </Popover>
  );
};

export default TaskHelp;
