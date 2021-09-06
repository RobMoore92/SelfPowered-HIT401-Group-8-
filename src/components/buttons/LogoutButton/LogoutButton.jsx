import "./LogoutButton.css";
import { IonFabButton, IonIcon, useIonToast } from "@ionic/react";
import firebase from "../../../firebase/firebase";
import { logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();
  const [present, dismiss] = useIonToast();
  const clickHandler = () => {
    firebase.auth().signOut().then(() => {
      present({
        buttons: [{ text: "hide", handler: () => dismiss() }],
        message: "You have logged out",
        duration: 2000,
      })
    });
    history.push("/welcome")
  };
  return (
    <IonFabButton
      data-testid="logout-button"
      onClick={clickHandler}
      className="h-9 w-9"
      shape="round"
      size="small"
      color="primary"
    >
      <IonIcon className="logout-button" color="light" icon={logOutOutline} />
    </IonFabButton>
  );
};
