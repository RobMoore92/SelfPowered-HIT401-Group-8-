import React from "react";
import { useHistory } from "react-router";
import { IonButton, IonIcon } from "@ionic/react";
import { arrowForwardCircleOutline } from "ionicons/icons";

const NavigateButton = ({ pathname, payload }) => {
  const history = useHistory();
  return (
    <IonButton
      data-testid={"navigate-button"}
      className={"ion-no-padding"}
      fill="clear"
      icon={arrowForwardCircleOutline}
      onClick={() => {
        history.push(pathname, payload);
      }}
    >
      <IonIcon
        className={`text-2xl text-gray-100`}
        icon={arrowForwardCircleOutline}
      />
    </IonButton>
  );
};

export default NavigateButton;
