import { IonButton, IonIcon } from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";

const SettingsButton = ({ toggleSettings }) => {
  return (
    <IonButton
      data-testid={"settings-button"}
      className="ion-no-padding"
      fill="clear"
      onClick={() => toggleSettings(true)}
    >
      <IonIcon
        slot="end"
        color="light"
        className="text-xl ml-0 pl-0"
        icon={ellipsisVertical}
      />
    </IonButton>
  );
};

export default SettingsButton;
