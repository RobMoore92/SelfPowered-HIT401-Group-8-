import "./LogoutButton.css";
import { IonFabButton, IonIcon, useIonToast } from "@ionic/react";
import { logout } from "../../../firebase/firebase";
import { logOutOutline } from "ionicons/icons";

export default () => {
  const [present, dismiss] = useIonToast();
  const clickHandler = () => {
    logout().then(() => {
      present({
        buttons: [{ text: "hide", handler: () => dismiss() }],
        message: "You have logged out",
        duration: 2000,
      });
    });
  };
  return (
    <IonFabButton
      data-testid="logout-button"
      onClick={clickHandler}
      className="h-9 w-9"
      shape="round"
      size="small"
      color="dark"
    >
      <IonIcon className="logout-button" color="light" icon={logOutOutline} />
    </IonFabButton>
  );
};
