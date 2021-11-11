import { IonFabButton, IonIcon } from "@ionic/react";
import { helpCircleSharp } from "ionicons/icons";

export default ({ setHelpPopped }) => {
  const clickHandler = () => {
    setHelpPopped(true);
  };
  return (
    <IonFabButton
      data-testid={"help-button"}
      style={{ "--background": "#eaeaea" }}
      onClick={() => clickHandler()}
      className="h-9 w-9"
      shape="round"
      size="small"
    >
      <IonIcon className={"text-blue-500"} icon={helpCircleSharp} />
    </IonFabButton>
  );
};
