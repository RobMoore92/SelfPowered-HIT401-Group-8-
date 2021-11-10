import { useState } from "react";
import { auth } from "../../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./ClientCard.css";
import { IonCard, IonCardContent, IonIcon, IonText } from "@ionic/react";
import {
  atCircleOutline,
  briefcaseOutline,
  callOutline,
  personCircleOutline,
} from "ionicons/icons";
import { updateClientImportant } from "../../../firebase/queries/clientQueries";
import NavigateButton from "../../buttons/NavigateButton/NavigateButton";
import ImportantButton from "../../buttons/ImportantButton/ImportantButton";
import Subtitle from "../Subtitle";
import ClientSettings from "../Settings/ClientSettings";
import { useHistory } from "react-router";

export default (props) => {
  const {
    client_id,
    name,
    firstName,
    lastName,
    company,
    phone,
    email,
    important,
    active,
  } = props.item;
  const [user] = useAuthState(auth);
  const [settings, toggleSettings] = useState(false);
  const history = useHistory();
  return (
    <IonCard className={"shadow transition duration-500 hover:shadow-lg mb-4"}>
      <div
        className={`flex w-full justify-between h-16 rounded-t-md ${
          active ? "bg-blue-500" : "bg-gray-500"
        } items-center p-4`}
      >
        <div className="flex space-x-4">
          <Subtitle
            icon={personCircleOutline}
            textColor={"text-white"}
            text={`${firstName} ${lastName}`}
          />
          <Subtitle
            icon={briefcaseOutline}
            textColor={"text-white"}
            text={company}
          />
        </div>
        <div className="flex items-center space-x-2">
          <NavigateButton
            history={history}
            pathname={"/client"}
            payload={{ clientDetails: props.item, title: name }}
          />
          <ImportantButton
            important={important}
            onClick={() =>
              updateClientImportant(user.uid, client_id, !important)
            }
          />
          <ClientSettings
            client={props.item}
            settings={settings}
            toggleSettings={toggleSettings}
            {...props}
            uid={user?.uid}
          />
        </div>
      </div>
      <IonCardContent
        className={"cursor-pointer"}
        onClick={() => {
          history.push("/client", { clientDetails: props.item, title: name });
        }}
        color="light"
      >
        <div className="flex items-center mb-3">
          <IonIcon
            color="primary"
            className="text-xl mr-4"
            icon={callOutline}
          />
          <IonText className="text-sm mr-6">{phone}</IonText>
        </div>
        <div className="flex items-center">
          <IonIcon
            color="primary"
            className="text-2xl mr-3"
            icon={atCircleOutline}
          />
          <IonText className="text-sm mr-6">{email}</IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
