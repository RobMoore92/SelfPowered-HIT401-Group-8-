import React, { useEffect, useState } from "react";
import firebase from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, useLocation } from "react-router";
import { getTasks } from "../../firebase/queries/taskQueries";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import AddTask from "../../components/form/AddTask";
import TaskCard from "../../components/cards/TaskCard/TaskCard";

const Tasks = (props) => {
  const { isPopped } = props;
  const location = useLocation();
  const [user] = useAuthState(firebase.auth());
  const [refresh, setRefresh] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [orderByName, toggleOrderByName] = useState(false);
  const [hideCompleted, toggleHideCompleted] = useState(false);
  const history = useHistory();
  const job = history.location.state?.jobDetails;
  const searchProperties = ["task", "job.title"];
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
      const unsubscribe = getTasks(
        user.uid,
        setTasks,
        orderByName,
        hideCompleted
      );
      return () => unsubscribe();
    }
  }, [orderByName, hideCompleted, location, user]);

  return (
    user && (
      <>
        <ListLayout
          data={tasks}
          filters={filters}
          searchProperties={searchProperties}
          Card={TaskCard}
          refresh={refresh}
          setRefresh={setRefresh}
          cardID={"task_id"}
          noDataMessage={"No task found, choose a job to add one."}
          {...props}
        />
        {isPopped && (
          <AddTask
            refresh={refresh}
            setRefresh={setRefresh}
            {...props}
            parent={job}
          />
        )}
      </>
    )
  );
};

export default Tasks;
