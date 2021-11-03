import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getTasksByJob } from "../../firebase/queries/taskQueries";
import ListLayout from "../../layouts/ListLayout";
import AddTask from "../../components/form/AddTask";
import TaskCard from "../../components/cards/TaskCard/TaskCard";
import { GlobalContext } from "../../App";

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
