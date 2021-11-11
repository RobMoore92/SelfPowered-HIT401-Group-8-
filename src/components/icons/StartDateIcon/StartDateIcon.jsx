import React from "react";
import { IonIcon } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";

const StartDateIcon = () => {
  return (
    <IonIcon
      data-testid={"start-date-icon"}
      className={`text-xl text-green-400`}
      icon={calendarOutline}
    />
  );
};

export default StartDateIcon;
