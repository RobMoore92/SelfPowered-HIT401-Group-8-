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
