import { useHistory } from "react-router";
import { IonFabButton, IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

const BackButton = () => {
  const history = useHistory();
  return (
    <IonFabButton
      style={{ "--background": "#e6e6e6" }}
      slot="end"
      className="menu-button"
      size="small"
      onClick={() => {
        history.back();
      }}
    >
      <IonIcon
        className={"menu-button-icon text-gray-700"}
        icon={arrowBackOutline}
      />
    </IonFabButton>
  );
};

export default BackButton;
