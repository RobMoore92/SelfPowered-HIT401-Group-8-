import React from "react";
import { IonCheckbox } from "@ionic/react";
import { completeJob } from "../../firebase/queries/jobQueries";

const CompletedCheckbox = ({ uid, id, completed, refresh, toggleRefresh }) => {
  return (
    <IonCheckbox
      onIonChange={() => {
        completeJob(uid, id, !completed).then(() => {
          toggleRefresh(!refresh);
        });
      }}
      color="primary"
      checked={completed}
    />
  );
};

export default CompletedCheckbox;
