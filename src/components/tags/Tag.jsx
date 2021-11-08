import { IonButton, IonIcon, IonText } from "@ionic/react";
import * as icons from "ionicons/icons";
import { closeCircle } from "ionicons/icons";
import { deleteTagByJob } from "../../firebase/queries/tagQueries";

export default ({ user, job_id, tag_id, name, icon }) => {
  return (
    <div
      color="light"
      className={`text-blue-500 ml-0 mr-2 px-3 py-2 rounded-lg bg-blue-500 flex items-center`}
    >
      <IonIcon
        size="small"
        className={"text-gray-100 mr-2"}
        icon={icons[icon]}
      />
      <IonText className={`text-gray-100 text-xs font-bold`}>{name}</IonText>
      <IonButton
        size={"small"}
        className={"ion-no-padding my-0 py-0"}
        fill={"clear"}
        onClick={() => {
          deleteTagByJob(user, job_id, tag_id);
        }}
      >
        <IonIcon className={"text-gray-100 text-sm ml-2"} icon={closeCircle} />
      </IonButton>
    </div>
  );
};
