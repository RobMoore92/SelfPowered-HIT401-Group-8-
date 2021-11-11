import { IonFabButton, IonIcon, useIonToast } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { logout } from "../../../firebase/queries/userQueries";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();
  const [present, dismiss] = useIonToast();
  return (
    <IonFabButton
      style={{ "--background": "#454545" }}
      data-testid="logout-button"
      onClick={() => logout(present, dismiss, history)}
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
