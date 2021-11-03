import { IonChip, IonLabel, IonIcon, IonText } from "@ionic/react";
import { heartCircle } from "ionicons/icons";
export default ({ name, icon, chipColor, iconColor, labelColor }) => {
  return (
    <IonChip color="light" className={`${chipColor} ml-0 mr-2 px-4`}>
      <IonIcon size="small" className={iconColor} icon={icon} />
      <IonText className={`text-gray-700 text-xs`}>{name}</IonText>
    </IonChip>
  );
};
