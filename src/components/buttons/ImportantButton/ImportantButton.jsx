import { IonButton, IonIcon } from "@ionic/react";
import { star } from "ionicons/icons";
import React from "react";

const ImportantButton = ({ important, onClick }) => {
  return (
    <IonButton
      data-testid={"important-button"}
      className={"ion-no-padding"}
      fill="clear"
      onClick={onClick}
    >
      <IonIcon
        className={`text-xl ${important ? "text-yellow-400" : "text-gray-100"}`}
        icon={star}
      />
    </IonButton>
  );
};

export default ImportantButton;
