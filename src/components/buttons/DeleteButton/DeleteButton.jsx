import React from "react";
import { IonButton } from "@ionic/react";

const DeleteButton = ({
  text,
  warningMessage,
  toggleSettings,
  statement,
  present,
}) => {
  return (
    <IonButton
      data-testid={"delete-button"}
      onClick={() => {
        toggleSettings(false);
        present({
          color: "danger",
          header: "Warning",
          message: warningMessage,
          buttons: [
            "Cancel",
            {
              text: "Yes",
              handler: () => statement(),
            },
          ],
        });
      }}
      color="danger"
      expand="full"
    >
      {text}
    </IonButton>
  );
};

export default DeleteButton;
