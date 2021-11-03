import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { documents, pricetagOutline } from "ionicons/icons";

const TagsButton = () => {
  return (
    <IonButton className={"ion-no-padding"} fill="clear" onClick={() => {}}>
      <IonIcon className={`text-xl text-white `} icon={pricetagOutline} />
    </IonButton>
  );
};

export default TagsButton;
