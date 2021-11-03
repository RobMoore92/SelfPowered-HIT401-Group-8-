import "./LogoutButton.css";
import { IonFabButton, IonIcon, useIonToast } from "@ionic/react";
import firebase from "../../../firebase/firebase";
import { logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();
  const [present, dismiss] = useIonToast();
  const clickHandler = () => {
    history.replace("/welcome");
    firebase
      .auth()
      .signOut()
      .then(() => {
        present({
          buttons: [{ text: "hide", handler: () => dismiss() }],
          message: "You have logged out",
          duration: 2000,
        });
      });
  };
  return (
    <IonFabButton
      style={{ "--background": "#454545" }}
      data-testid="logout-button"
      onClick={clickHandler}
      className="menu-button mr-4"
      shape="round"
      size="small"
    >
      <IonIcon
        className="menu-button-icon pl-1 text-xl md:text-2xl"
        color="light"
        icon={logOutOutline}
      />
    </IonFabButton>
  );
};
