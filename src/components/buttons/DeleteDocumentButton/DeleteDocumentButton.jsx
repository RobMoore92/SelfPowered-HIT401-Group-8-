import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { deleteDocument } from "../../../firebase/queries/documentQueries";

const DeleteDocumentButton = (props) => {
  const { fullPath, refresh, setRefresh } = props;
  return (
    <IonButton
      className={"ion-no-padding"}
      fill="clear"
      onClick={() => {
        deleteDocument(fullPath, setRefresh, refresh);
      }}
    >
      <IonIcon className={`text-xl text-gray-700`} icon={trashOutline} />
    </IonButton>
  );
};

export default DeleteDocumentButton;
