<<<<<<< HEAD
import React, { useState } from "react";
import firebase from "../../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IonCard, IonCardContent, IonText } from "@ionic/react";
import { calendarOutline, hourglassOutline } from "ionicons/icons";
import { isPast } from "date-fns";
import { cardColor } from "../../../helpers/cardColor";
import { formatDateTime } from "../../../helpers/formatHelper";
import Tag from "../../tags/Tag";
import DueIcon from "../../buttons/DueIcon/DueIcon";
import NavigateButton from "../../buttons/NavigateButton/NavigateButton";
import CompletedCheckbox from "../CompletedCheckbox";
import JobSettings from "../Settings/JobSettings";
import Subtitle from "../Subtitle";
import DocumentsButton from "../../buttons/DocumentsButton/DocumentsButton";
import TagsButton from "../../buttons/TagsButton/TagsButton";
import DocumentsPopover from "../../popovers/DocumentsPopover";
import useTimer from "../../hooks/useTimer";

export default (props) => {
  const { item, isPopped, setPopped, parent } = props;
  const {
    client_name,
    job_id,
    start,
    due,
    completed,
    title,
    description,
    tags,
  } = item;
  const startDateTime = new Date(start.seconds * 1000);
  const dueDateTime = new Date(due.seconds * 1000);
  const overdue = isPast(dueDateTime);
  const [user] = useAuthState(firebase.auth());
  const timer = useTimer(dueDateTime, completed);
  const [showDocuments, toggleDocuments] = useState(false);
  console.log(title);
  return (
    <IonCard>
      <div
        className={`flex w-full justify-between h-16 rounded-t-md ${cardColor(
          completed,
          overdue
        )} items-center p-4`}
      >
        <div className="flex items-center">
          <Subtitle
            icon={hourglassOutline}
            textColor={"text-white"}
            text={timer}
          />
        </div>
        <div className="flex items-center space-x-2">
          <TagsButton />
          {overdue && !completed && <DueIcon />}
          <DocumentsButton
            showDocuments={showDocuments}
            toggleDocuments={toggleDocuments}
          />
          <NavigateButton
            pathname={"/job"}
            payload={{ jobDetails: item, title: title }}
          />
          <CompletedCheckbox
            uid={user.uid}
            id={job_id}
            completed={completed}
            {...props}
          />
          <JobSettings
            isPopped={isPopped}
            setPopped={setPopped}
            uid={user?.uid}
            job={item}
          />
        </div>
      </div>

      {showDocuments && (
        <DocumentsPopover
          isPopped={showDocuments}
          setPopped={toggleDocuments}
          uid={user.uid}
          id={job_id}
        />
      )}

      <IonCardContent color="light">
        <div className="flex flex-col">
          <div className={"flex space-x-4"}>
            <div
              className={
                "flex items-center sm:space-x-4 justify-between sm:justify-start w-full"
              }
            >
              <Subtitle
                icon={calendarOutline}
                color={"text-green-400"}
                textColor={"text-gray-600"}
                text={formatDateTime(startDateTime)}
              />
              <Subtitle
                icon={calendarOutline}
                color={"text-red-400"}
                textColor={"text-gray-600"}
                text={formatDateTime(dueDateTime)}
              />
            </div>
          </div>
          {!parent && (
            <IonText className={"mt-2 text-sm text-gray-600 font-medium"}>
              {client_name}
            </IonText>
          )}
          <IonText
            className={`text-2xl text-gray-700 font-semibold leading-right ${
              completed && "line-through"
            }`}
          >
            {title}
          </IonText>
          <IonText className={"text-sm text-gray-600 mt-1"}>
            {description}
          </IonText>
        </div>
        {tags && (
          <div className="mt-5">
            {tags.map(({ id, icon, name, chipColor, iconColor }) => {
              return (
                <Tag
                  key={id}
                  icon={icon}
                  name={name}
                  chipColor={chipColor}
                  iconColor={iconColor}
                />
              );
            })}
          </div>
        )}
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
import {completeJob, deleteClient, deleteJob, updateClientActive} from "../../../firebase/database";
import AddClient from "../../form/AddClient";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/firebase";
import AddJob from "../../form/AddJob";
import {useHistory} from "react-router-dom";


export default (props) => {
    const {client_name, job_id, start, due, completed, title, description, tags, refresh, setRefresh} = props;
    const history = useHistory()
    const [user] = useAuthState(auth);
    const formatDate = (date) => {
        if (completed) {
            return "Completed";
        } else if (isPast(date)) {
            return `${formatDistance(date, new Date())} overdue`;
        } else {
            return formatDistanceToNow(date, {includeSeconds: false});
        }
    };
    const [dueTimer, setDueTimer] = useState(formatDate(due.toDate()))
    useEffect(() => {
        const interval = setInterval(() => {
            setDueTimer(formatDate(due.toDate()))
        }, 100)
        return () => clearInterval(interval);
    }, [completed, refresh])

    const statusIcon = () => {
        if (isPast(due.toDate()) && !completed) {
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
                    <IonText className="text-sm mr-6 text-gray-100">{client_name}</IonText>
                    <IonIcon color="light" className="text-2xl mr-2" icon={calendarOutline}/>
                    <IonText className="text-sm ml-2 text-gray-100">{dueTimer}</IonText>
                </div>
                <div className="flex items-center space-x-2">
                    <IonButton
                        className="ion-no-padding"
                        fill="clear"
                        onClick={() => {
                            history.push({pathname: "/job", state: {"jobDetails": {job_id, title, description, start, due, completed}}});
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
                            completeJob(user.uid, job_id, !completed)
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
                    <IonText className={`text-xl font-semibold ${completed && "line-through"}`}>{title}</IonText>
                    <IonText className="mt-2">{description}</IonText>
                </div>
                {tags && <div className="mt-5">
                    {tags.map(({id, icon, name, chipColor, iconColor}) => {
                        return (
                            <Tag
                                key={id}
                                icon={icon}
                                name={name}
                                chipColor={chipColor}
                                iconColor={iconColor}
                            />
                        );
                    })}
                </div>}
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
    const {client_name, client_id, id, start, due, completed, title, description} =
        props;

    const formattedStart = start.toDate()
    const formattedDue = due.toDate()
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
                                        deleteJob(uid, id)
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
