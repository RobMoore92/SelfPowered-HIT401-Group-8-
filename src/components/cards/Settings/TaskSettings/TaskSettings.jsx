import { useState } from "react";
import { useIonToast } from "@ionic/react";
import { deleteTask } from "../../../../firebase/queries/taskQueries";
import Popover from "../../../popovers/PopoverContainer/PopoverContainer";
import SettingsButton from "../../../buttons/SettingsButton/SettingsButton";
import EditButton from "../../../buttons/EditButton/EditButton";
import DeleteButton from "../../../buttons/DeleteButton/DeleteButton";
import AddTask from "../../../form/AddTask/AddTask";

const TaskSettings = (props) => {
  const [present] = useIonToast();
  const { uid, task, parent, refresh, setRefresh } = props;
  const [showSettings, toggleShowSettings] = useState(false);
  const [showEdit, toggleShowEdit] = useState(false);
  return (
    <>
      <SettingsButton toggleSettings={toggleShowSettings} />
      <Popover isPopped={showSettings} setPopped={toggleShowSettings}>
        <div data-testid={"task-settings"} className={"space-y-4"}>
          <EditButton
            text={"Edit Task"}
            toggleEdit={toggleShowEdit}
            toggleSettings={toggleShowSettings}
          />

          <DeleteButton
            text={"Delete Task"}
            warningMessage={"Are you sure you want to delete this task?"}
            statement={() =>
              deleteTask(uid, parent.job_id, task.task_id, refresh, setRefresh)
            }
            present={present}
            toggleSettings={toggleShowSettings}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </div>
      </Popover>
      <AddTask
        mode={"edit"}
        isPopped={showEdit}
        setPopped={toggleShowEdit}
        editValues={task}
        parent={task.job}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default TaskSettings;
