import { IonIcon, IonText } from "@ionic/react";
import { alertCircle } from "ionicons/icons";
import React from "react";

const NoData = ({ message }) => {
  return (
    <div
      className={
        "h-full w-full max-w-sm flex flex-col justify-center self-center items-center mb-12 md:mt-32 text-center"
      }
    >
      <IonIcon className={"text-6xl text-blue-500 mb-2"} icon={alertCircle} />
      <IonText className={"text-2xl font-medium text-gray-700"}>
        {message}
      </IonText>
    </div>
  );
};

export default NoData;
