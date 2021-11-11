import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { deleteDocument } from "../../../firebase/queries/documentQueries";

const DeleteDocumentButton = (props) => {
  const { fullPath, refresh, setRefresh } = props;
  return (
    <IonButton
      data-testid={"delete-document-button"}
      className={"ion-no-padding"}
      fill="clear"
      onClick={() => {
        deleteDocument(fullPath, setRefresh, refresh);
      }}
    >
      <IonIcon className={`text-xl text-white`} icon={trashOutline} />
    </IonButton>
  );
};

export default DeleteDocumentButton;
