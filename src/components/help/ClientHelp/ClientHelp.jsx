import React from "react";
import Popover from "../../popovers/PopoverContainer/PopoverContainer";
import { IonIcon, IonItem, IonTitle } from "@ionic/react";
import {
  briefcaseSharp,
  ellipsisVertical,
  helpCircle,
  starSharp,
} from "ionicons/icons";

const ClientHelp = (props) => {
  return (
    <Popover {...props}>
      <div className={"flex items-center space-x-2 mb-4"}>
        <IonIcon icon={helpCircle} className={"text-2xl text-blue-500 mr-1"} />
        <IonTitle className={"ion-no-padding"}>Client Help</IonTitle>
      </div>
      <p className={"mb-2"}>This page lists all your clients.</p>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={briefcaseSharp}
            className={"text-xl text-blue-500 mr-4"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>
          The company the client works for.
        </p>
      </IonItem>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={starSharp}
            className={"text-xl text-yellow-500 mr-4"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>
          This button makes the client important and will bring the card to the
          top.
        </p>
      </IonItem>
      <IonItem lines={"none"}>
        <IonIcon
          icon={ellipsisVertical}
          className={"text-xl text-gray-500 mr-4"}
        />
        <p className={"ion-no-padding text-sm"}>
          Client settings - you can edit or delete the client.
        </p>
      </IonItem>
    </Popover>
  );
};

export default ClientHelp;
