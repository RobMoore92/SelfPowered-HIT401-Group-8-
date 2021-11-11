import React from "react";
import Popover from "../../popovers/PopoverContainer/PopoverContainer";
import { IonIcon, IonItem, IonTitle } from "@ionic/react";
import {
  briefcaseSharp,
  calendarOutline,
  ellipsisVertical,
  helpCircle,
  hourglassSharp,
  squareSharp,
} from "ionicons/icons";

const TaskHelp = (props) => {
  return (
    <Popover {...props}>
      <div className={"flex items-center space-x-2 mb-4"}>
        <IonIcon icon={helpCircle} className={"text-2xl text-blue-500 mr-1"} />
        <IonTitle className={"ion-no-padding"}>Task Help</IonTitle>
      </div>
      <p className={"mb-2"}>This page lists all your tasks.</p>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={squareSharp}
            className={"text-xl text-red-500 mr-4 mt-2"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>Task is overdue.</p>
      </IonItem>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={squareSharp}
            className={"text-xl text-blue-500 mr-4 mt-2"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>Task is in progress.</p>
      </IonItem>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={squareSharp}
            className={"text-xl text-green-500 mr-4 mt-2"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>Task is completed.</p>
      </IonItem>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={briefcaseSharp}
            className={"text-xl text-blue-500 mr-4"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>
          Job that the task belongs to.
        </p>
      </IonItem>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={calendarOutline}
            className={"text-xl text-green-500 mr-4"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>When the task started</p>
      </IonItem>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={calendarOutline}
            className={"text-xl text-red-500 mr-4"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>When the task is due</p>
      </IonItem>
      <IonItem lines={"none"}>
        <div>
          <IonIcon
            icon={hourglassSharp}
            className={"text-xl text-gray-500 mr-4"}
          />
        </div>
        <p className={"ion-no-padding text-sm"}>
          How long until the task is due.
        </p>
      </IonItem>
      <IonItem lines={"none"}>
        <IonIcon
          icon={ellipsisVertical}
          className={"text-xl text-gray-500 mr-4"}
        />
        <p className={"ion-no-padding text-sm"}>
          Task settings - you can edit or delete the task.
        </p>
      </IonItem>
    </Popover>
  );
};

export default TaskHelp;
