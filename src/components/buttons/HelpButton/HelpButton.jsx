import { IonFabButton, IonIcon } from "@ionic/react";
import { helpCircleOutline } from "ionicons/icons";

export default ({ setShowHelp }) => {
  const clickHandler = () => {
    setShowHelp(true);
  };
  return (
    <IonFabButton
      data-testid="help-button"
      onClick={clickHandler}
      className="h-9 w-9 "
      shape="round"
      size="small"
      color="primary"
    >
      <IonIcon color="light" icon={helpCircleOutline} />
    </IonFabButton>
  );
};
