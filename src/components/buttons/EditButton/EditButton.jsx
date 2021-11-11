import React from "react";
import { IonButton } from "@ionic/react";

const EditButton = ({ text, toggleEdit, toggleSettings }) => {
  return (
    <IonButton
      data-testid={"edit-button"}
      onClick={() => {
        toggleSettings(false);
        toggleEdit(true);
      }}
      color="warning"
      expand="full"
    >
      {text}
    </IonButton>
  );
};

export default EditButton;
