import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { documents } from "ionicons/icons";

const DocumentsButton = ({ showDocuments, toggleDocuments }) => {
  return (
    <IonButton
      className={"ion-no-padding"}
      fill="clear"
      onClick={() => toggleDocuments(!showDocuments)}
    >
      <IonIcon className={`text-xl text-white mr-1`} icon={documents} />
    </IonButton>
  );
};

export default DocumentsButton;
