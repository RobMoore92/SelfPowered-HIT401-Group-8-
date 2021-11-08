import { IonFabButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";

const AddButton = ({ setPopped }) => {
  return (
    <IonFabButton
      style={{ "--background": "#46d530" }}
      slot="end"
      className="menu-button"
      size="small"
      onClick={() => {
        setPopped(true);
      }}
    >
      <IonIcon className={"menu-button-icon"} icon={addOutline} />
    </IonFabButton>
  );
};

export default AddButton;
