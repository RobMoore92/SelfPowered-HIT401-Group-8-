import { useState } from "react";
import { IonLabel, IonToggle, useIonToast } from "@ionic/react";
import {
  deleteClient,
  updateClientActive,
} from "../../../../firebase/queries/clientQueries";
import Popover from "../../../popovers/PopoverContainer/PopoverContainer";
import AddClient from "../../../form/AddClient/AddClient";
import SettingsButton from "../../../buttons/SettingsButton/SettingsButton";
import EditButton from "../../../buttons/EditButton/EditButton";
import DeleteButton from "../../../buttons/DeleteButton/DeleteButton";

const ClientSettings = (props) => {
  const { uid, client, settings, toggleSettings } = props;
  const { client_id, active } = client;
  const [present] = useIonToast();
  const [edit, toggleEdit] = useState(false);
  return (
    <>
      <SettingsButton toggleSettings={toggleSettings} />
      <Popover isPopped={settings} setPopped={toggleSettings}>
        <div
          data-testid={"client-settings"}
          className="flex justify-between items-center"
        >
          <IonLabel>Active</IonLabel>
          <IonToggle
            checked={active}
            onIonChange={() => {
              updateClientActive(uid, client_id, !active);
            }}
          />
        </div>
        <div className={"space-y-4"}>
          <EditButton
            text={"Edit Client"}
            toggleSettings={toggleSettings}
            toggleEdit={toggleEdit}
          />
          <DeleteButton
            present={present}
            warningMessage={"Are you sure you want to delete this client?"}
            text={"Delete Client"}
            statement={() => deleteClient(uid, client_id)}
            toggleSettings={toggleSettings}
          />
        </div>
      </Popover>
      <AddClient
        isPopped={edit}
        setPopped={toggleEdit}
        editValues={client}
        mode={"edit"}
      />
    </>
  );
};

export default ClientSettings;
