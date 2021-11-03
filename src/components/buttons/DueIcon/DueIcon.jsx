import React from "react";
import { IonIcon } from "@ionic/react";
import { warning } from "ionicons/icons";

const DueIcon = () => {
  return (
    <IonIcon
      className="mr-1 text-2xl text-gray-100"
      icon={warning}
      slot="end"
    />
  );
};

export default DueIcon;
