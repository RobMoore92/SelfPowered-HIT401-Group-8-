import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { pricetagOutline } from "ionicons/icons";

const TagsButton = ({ toggleTags }) => {
  return (
    <IonButton
      className={"ion-no-padding"}
      fill="clear"
      onClick={() => {
        toggleTags(true);
      }}
    >
      <IonIcon className={`text-xl text-white `} icon={pricetagOutline} />
    </IonButton>
  );
};

export default TagsButton;
