import { IonLabel, IonToggle } from "@ionic/react";
import React from "react";

const SearchFilter = ({ title, show, setShow }) => {
  return (
    <div className={"flex items-center"}>
      <IonLabel className={"text-xs"} for={title}>
        {title}
      </IonLabel>
      <IonToggle
        name={title}
        checked={show}
        onIonChange={() => setShow(!show)}
      />
    </div>
  );
};

export default SearchFilter;
