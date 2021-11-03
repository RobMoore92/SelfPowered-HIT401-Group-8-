<<<<<<< HEAD
import { IonCard, IonCardContent, IonCheckbox, IonText } from "@ionic/react";
import { briefcase, calendarOutline, hourglassOutline } from "ionicons/icons";

import { isPast } from "date-fns";

import { completeTask } from "../../../firebase/queries/taskQueries";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase";
import useTimer from "../../hooks/useTimer";
import { formatDateTime } from "../../../helpers/formatHelper";
import Subtitle from "../Subtitle";
import DueIcon from "../../buttons/DueIcon/DueIcon";
import { cardColor } from "../../../helpers/cardColor";
import TaskSettings from "../Settings/TaskSettings";
import { useState } from "react";

export default (props) => {
  const { item, isPopped, setPopped, refresh, setRefresh } = props;
  const { task_id, task, start, due, completed } = item;
  const [user] = useAuthState(auth);
  const formattedStart = new Date(start.seconds * 1000);
  const formattedDue = new Date(due.seconds * 1000);
  const overdue = isPast(formattedDue);
  const timer = useTimer(formattedDue, completed);

  return (
    <IonCard>
      <div
        className={`flex w-full justify-between h-16 rounded-t-md bg-gray-600 items-center p-4`}
      >
        <div className="flex items-center space-x-4">
          <Subtitle
            hasHover
            icon={briefcase}
            color={"text-blue-400"}
            textColor={"text-gray-100"}
            text={item?.job?.title}
          />

          <Subtitle
            hasHover
            icon={calendarOutline}
            color={"text-green-400"}
            textColor={"text-gray-100"}
            text={formatDateTime(formattedStart)}
          />
          <Subtitle
            hasHover
            icon={calendarOutline}
            color={"text-red-400"}
            textColor={"text-gray-100"}
            text={formatDateTime(formattedDue)}
          />
          <Subtitle
            icon={hourglassOutline}
            text={timer}
            textColor={"text-gray-100"}
          />
        </div>
        <div className="flex items-center space-x-2">
          <TaskSettings
            isPopped={isPopped}
            setPopped={setPopped}
            uid={user?.uid}
            task={item}
            parent={item.job}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </div>
      </div>

      <IonCardContent
        color="light"
        className={`${cardColor(completed, overdue)} text-white`}
      >
        <div className="flex justify-between items-center">
          <IonText className={`text-xl ${completed && "line-through"}`}>
            {task}
          </IonText>
          <div className={"flex items-center space-x-2"}>
            {isPast(formattedDue) && !completed && <DueIcon />}
            <IonCheckbox
              onIonChange={() => {
                completeTask(
                  user.uid,
                  item.job.job_id,
                  item.task_id,
                  !completed,
                  refresh,
                  setRefresh
                );
              }}
              color="primary"
              checked={completed}
            />
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
=======
import {
    IonCard,
    IonIcon,
    IonText,
    IonCardContent,
    IonCheckbox, useIonAlert, IonButton, IonLabel, IonToggle,
} from "@ionic/react";
import {
    arrowForwardCircleOutline,
    calendarOutline,
    ellipsisVertical,
    personCircleOutline,
    warning,
} from "ionicons/icons";
import Tag from "../../tags/Tag";
import {formatDistance, formatDistanceToNow} from "date-fns/esm";
import {isPast} from "date-fns";
import {useEffect, useState} from "react";
import Popover from "../../containers/Popover/Popover";
import {completeJob, deleteClient, deleteJob, deleteTask, updateClientActive} from "../../../firebase/database";
import AddClient from "../../form/AddClient";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/firebase";
import AddJob from "../../form/AddJob";
import {useHistory} from "react-router-dom";


export default (props) => {
    const { task_id, task, start, due, completed, title,  refresh, setRefresh} = props;

    const history = useHistory()
    const [user] = useAuthState(auth);
    const formattedStart = new Date(start.seconds * 1000)
    const formattedDue = new Date(due.seconds * 1000)
    const formatDate = (date) => {
        if (completed) {
            return "Completed";
        } else if (isPast(date)) {
            return `${formatDistance(date, new Date())} overdue`;
        } else {
            return formatDistanceToNow(date, {includeSeconds: false});
        }
    };
    const [dueTimer, setDueTimer] = useState(formatDate(formattedDue))
    useEffect(() => {
        const interval = setInterval(() => {
            setDueTimer(formatDate(formattedDue))
        }, 100)
        return () => clearInterval(interval);
    }, [completed, refresh])

    const statusIcon = () => {
        if (isPast(formattedDue) && !completed) {
            return (
                <IonIcon color="danger" className="mr-1 text-2xl" icon={warning} slot="end"/>
            );
        }
    };
    return (
        <IonCard>
            <div className="flex w-full justify-between h-16 rounded-t-md bg-blue-500 items-center p-4">
                <div className="flex items-center">
                    <IonIcon color="light" className="text-2xl mr-2" icon={personCircleOutline}/>
                    <IonText className="text-sm mr-6 text-gray-100">{title}</IonText>
                    <IonIcon color="light" className="text-2xl mr-2" icon={calendarOutline}/>
                    <IonText className="text-sm ml-2 text-gray-100">{dueTimer}</IonText>
                </div>
                <div className="flex items-center space-x-2">
                    <IonButton
                        className="ion-no-padding"
                        fill="clear"
                        onClick={() => {
                            history.push({pathname: "/job", state: {"jobDetails": {task_id, title, start, due, completed}}});
                        }}
                    >
                        <IonIcon
                            className={`text-2xl text-gray-100`}
                            icon={arrowForwardCircleOutline}
                        />
                    </IonButton>
                    {statusIcon()}
                    <IonCheckbox
                        onIonChange={() => {
                            completeJob(user.uid, task_id, !completed)
                            setRefresh(!refresh)
                        }}
                        color="primary"
                        checked={completed}
                    />
                    <SettingsPopover {...props} uid={user.uid}/>
                </div>
            </div>

            <IonCardContent color="light">
                <div className="flex flex-col">
                    <IonText className={`text-xl font-semibold ${completed && "line-through"}`}>{task}</IonText>
                </div>
            </IonCardContent>
        </IonCard>
    );
};


const SettingsPopover = (props) => {
    const {uid} = props;
    const [settingsPopped, setSettingsPopped] = useState(false);
    const [editPopped, setEditPopped] = useState(false);
    const [present] = useIonAlert();
    const showSettings = () => setSettingsPopped(true);
    const showEdit = () => {
        setSettingsPopped(false);
        setEditPopped(true);
    };
    const { job_id, task_id, task, start, due, completed, } =
        props;

    return (
        <>
            <IonButton className="ion-no-padding" fill="clear" onClick={showSettings}>
                <IonIcon
                    slot="end"
                    color="light"
                    className="text-xl ml-0 pl-0"
                    icon={ellipsisVertical}
                />
            </IonButton>
            <Popover isPopped={settingsPopped} setPopped={setSettingsPopped}>
                <IonButton
                    onClick={showEdit}
                    className="mt-4"
                    color="warning"
                    expand="full"
                >
                    Edit Job
                </IonButton>
                <IonButton
                    onClick={() => {
                        setSettingsPopped(false);
                        present({
                            cssClass: "my-css",
                            header: "Warning",
                            message: `Are you sure you want to delete this job?`,
                            buttons: [
                                "Cancel",
                                {
                                    text: "Yes",
                                    handler: () => {
                                        deleteTask(uid, job_id, task_id)
                                    },
                                },
                            ],
                        });
                    }}
                    className="mt-4"
                    color="danger"
                    expand="full"
                >
                    Delete Job
                </IonButton>
            </Popover>
            <AddJob
                {...props}
                isPopped={editPopped}
                setPopped={setEditPopped}
                editValues={{...props}}
            />
        </>
    );
};

>>>>>>> 9e8b36b8532e5afc3f720aa2f0426e27de2c6bec
