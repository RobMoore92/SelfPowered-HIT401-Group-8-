import { IonFabButton, IonIcon } from "@ionic/react";
import { helpCircleOutline } from "ionicons/icons";

export default ({ setShowHelp }) => {
  const clickHandler = () => {
    setShowHelp(true);
  };
  return (
    <IonFabButton
      style={{ "--background": "#1a85ff" }}
      data-testid="help-button"
      onClick={clickHandler}
      className="h-9 w-9"
      shape="round"
      size="small"
    >
      <IonIcon color="light" icon={helpCircleOutline} />
    </IonFabButton>
  );
};
