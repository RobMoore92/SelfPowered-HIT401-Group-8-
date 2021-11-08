import { useState } from "react";
import { deleteJob } from "../../../firebase/queries/jobQueries";
import { useIonToast } from "@ionic/react";
import Popover from "../../popovers/PopoverContainer/PopoverContainer";
import SettingsButton from "../../buttons/SettingsButton/SettingsButton";
import EditButton from "../../buttons/EditButton/EditButton";
import DeleteButton from "../../buttons/DeleteButton/DeleteButton";
import AddJob from "../../form/AddJob";

const JobSettings = (props) => {
  const [present] = useIonToast();
  const { uid, job } = props;
  const [showSettings, toggleShowSettings] = useState(false);
  const [showEdit, toggleShowEdit] = useState(false);
  return (
    <>
      <SettingsButton toggleSettings={toggleShowSettings} />
      <Popover isPopped={showSettings} setPopped={toggleShowSettings}>
        <div className={"space-y-4"}>
          <EditButton
            text={"Edit Job"}
            toggleEdit={toggleShowEdit}
            toggleSettings={toggleShowSettings}
          />
          <DeleteButton
            text={"Delete Job"}
            warningMessage={"Are you sure you want to delete this job?"}
            statement={() => deleteJob(uid, job.job_id)}
            toggleSettings={toggleShowSettings}
            present={present}
          />
        </div>
      </Popover>
      <AddJob isPopped={showEdit} setPopped={toggleShowEdit} editValues={job} />
    </>
  );
};

export default JobSettings;
