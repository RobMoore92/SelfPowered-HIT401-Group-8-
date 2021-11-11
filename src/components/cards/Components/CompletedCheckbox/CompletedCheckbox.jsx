import React from "react";
import { IonCheckbox } from "@ionic/react";
import { completeJob } from "../../../../firebase/queries/jobQueries";

const CompletedCheckbox = ({ uid, id, completed, refresh, setRefresh }) => {
  return (
    <IonCheckbox
      data-testid={"completed-checkbox"}
      onIonChange={() => {
        completeJob(uid, id, !completed).then(() => {
          setRefresh(!refresh);
        });
      }}
      color="primary"
      checked={completed}
    />
  );
};

export default CompletedCheckbox;
