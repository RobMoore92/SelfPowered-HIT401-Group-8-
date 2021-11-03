import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getTasksByJob } from "../../firebase/queries/taskQueries";
import ListLayout from "../../layouts/ListLayout";
import AddTask from "../../components/form/AddTask";
import TaskCard from "../../components/cards/TaskCard/TaskCard";
import { GlobalContext } from "../../App";
import { IonIcon, IonText } from "@ionic/react";
import {
  calendarNumberSharp,
  documentTextOutline,
  textOutline,
} from "ionicons/icons";
import { formatDateTime } from "../../helpers/formatHelper";

const Jobs = (props) => {
  const { isPopped } = props;
  const location = useLocation();
  const { user } = useContext(GlobalContext);
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [orderByName, toggleOrderByName] = useState(false);
  const [hideCompleted, toggleHideCompleted] = useState(true);
  const history = useHistory();
  const job = history.location.state?.jobDetails;
  const searchProperties = ["task"];
  const filters = [
    {
      title: "Order By Name",
      show: orderByName,
      setShow: toggleOrderByName,
    },
    {
      title: "Hide Completed",
      show: hideCompleted,
      setShow: toggleHideCompleted,
    },
  ];

  useEffect(() => {
    if (user) {
      const unsubscribe = getTasksByJob(
        user.uid,
        job?.job_id,
        setTasks,
        orderByName,
        hideCompleted
      );
      return () => unsubscribe();
    }
  }, [user, orderByName, hideCompleted, location, refresh]);

  return (
    user && (
      <>
        <div>
          <div
            className={
              "md:flex md:space-x-16 space-y-4 md:space-y-0 mt-4 md:mt-8 flex justify-center mb-4 grid grid-rows-2 md:grid-rows-none"
            }
          >
            <div className={"flex items-center space-x-4"}>
              <IonIcon
                icon={calendarNumberSharp}
                className={"text-3xl md:text-5xl text-green-500"}
              />
              <div className={"flex flex-col mt-1"}>
                <IonText
                  className={
                    "font-bold text-xs md:text-sm  text-gray-700 uppercase tracking-widest"
                  }
                >
                  Job Start Date
                </IonText>
                <IonText className={"text-sm md:text-base"}>
                  {job && formatDateTime(job?.start.seconds * 1000)}
                </IonText>
              </div>
            </div>
            <div className={"flex items-center space-x-4"}>
              <IonIcon
                icon={calendarNumberSharp}
                className={"text-3xl md:text-5xl text-red-500"}
              />
              <div className={"flex flex-col mt-1"}>
                <IonText
                  className={
                    "font-bold text-xs md:text-sm text-gray-700 uppercase tracking-widest"
                  }
                >
                  Job Due Date
                </IonText>
                <IonText className={"text-sm md:text-base"}>
                  {job && formatDateTime(job.due.seconds * 1000)}
                </IonText>
              </div>
            </div>
          </div>
        </div>
        <ListLayout
          data={tasks}
          filters={filters}
          parent={job}
          searchProperties={searchProperties}
          Card={TaskCard}
          refresh={refresh}
          setRefresh={setRefresh}
          cardID={"task_id"}
          noDataMessage={"No task found"}
          {...props}
        />
        {isPopped && <AddTask {...props} parent={job} />}
      </>
    )
  );
};

export default Jobs;
