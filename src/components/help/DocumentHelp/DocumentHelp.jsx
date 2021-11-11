import React from "react";
import Popover from "../../popovers/PopoverContainer/PopoverContainer";
import { IonIcon, IonTitle } from "@ionic/react";
import { helpCircle } from "ionicons/icons";

const DocumentHelp = (props) => {
  return (
    <Popover {...props}>
      <div className={"flex items-center space-x-2 mb-4"}>
        <IonIcon icon={helpCircle} className={"text-2xl text-blue-500 mr-1"} />
        <IonTitle className={"ion-no-padding"}>Document Help</IonTitle>
      </div>
      <p className={"mb-2"}>
        This page lists all your documents. You can download or delete them. If
        you would like to add more you will need to head to a job card and add
        them there.
      </p>
    </Popover>
  );
};

export default DocumentHelp;
