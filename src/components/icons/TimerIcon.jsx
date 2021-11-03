import React from "react";
import { IonIcon } from "@ionic/react";
import { hourglassOutline } from "ionicons/icons";

const TimerIcon = () => {
  return (
    <IonIcon color="light" className="text-2xl mr-2" icon={hourglassOutline} />
  );
};

export default TimerIcon;
