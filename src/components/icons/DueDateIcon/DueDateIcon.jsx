import React from "react";
import { IonIcon } from "@ionic/react";
import { calendarOutline } from "ionicons/icons";

const DueDateIcon = () => {
  return (
    <IonIcon
      data-testid={"due-date-icon"}
      className={`text-xl text-red-400`}
      icon={calendarOutline}
    />
  );
};

export default DueDateIcon;
