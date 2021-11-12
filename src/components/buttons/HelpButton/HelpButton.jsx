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
      className="menu-button mr-4"
      shape="round"
      size="small"
    >
      <IonIcon
        className="menu-button-icon pl-1 text-xl md:text-2xl text-blue-500"
        icon={helpCircleSharp}
      />
    </IonFabButton>
  );
};
