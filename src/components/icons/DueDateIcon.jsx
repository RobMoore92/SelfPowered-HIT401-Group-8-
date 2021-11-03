import React from "react";
import { IonIcon } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";

const StartDateIcon = () => {
  return <IonIcon className={`text-xl text-red-400`} icon={calendarOutline} />;
};

export default StartDateIcon;
