import React from "react";
import Popover from "../popovers/PopoverContainer/PopoverContainer";
import { IonIcon, IonItem, IonTitle } from "@ionic/react";
import {
  documentsSharp,
  ellipsisVertical,
  helpCircle,
  pricetagOutline,
  squareSharp,
} from "ionicons/icons";

const JobHelp = (props) => {
  return (
    <Popover {...props}>
      <div className={"flex items-center space-x-2 mb-4"}>
        <IonIcon icon={helpCircle} className={"text-2xl text-blue-500 mr-1"} />
        <IonTitle className={"ion-no-padding"}>Job Help</IonTitle>
      </div>
      <p className={"mb-2"}>This page lists all your jobs.</p>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={squareSharp}
            className={"text-xl text-red-500 mr-4 mt-2"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>Job is overdue.</p>
      </IonItem>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={squareSharp}
            className={"text-xl text-blue-500 mr-4 mt-2"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>Job is in progress.</p>
      </IonItem>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={squareSharp}
            className={"text-xl text-green-500 mr-4 mt-2"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>Job is completed.</p>
      </IonItem>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={pricetagOutline}
            className={"text-xl text-gray-500 mr-4"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>
          Tags can be added to your job cards using this button.
        </p>
      </IonItem>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={documentsSharp}
            className={"text-xl text-gray-500 mr-4"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>
          Documents can be added to your job cards using this button. You can
          download / delete them. They are also available on the Documents page.
        </p>
      </IonItem>
      <IonItem lines={"none"}>
        <IonIcon
          icon={ellipsisVertical}
          className={"text-xl text-gray-500 mr-4"}
        />
        <p className={"ion-no-padding text-sm"}>
          Job settings - you can edit or delete the job.
        </p>
      </IonItem>
    </Popover>
  );
};

export default JobHelp;
