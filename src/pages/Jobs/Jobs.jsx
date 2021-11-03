import React, { useEffect, useState } from "react";
import firebase from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { getJobs } from "../../firebase/queries/jobQueries";
import ListLayout from "../../layouts/ListLayout";
import JobCard from "../../components/cards/JobCard/JobCard";
import AddJob from "../../components/form/AddJob";

const Jobs = (props) => {
  const { isPopped } = props;
  const [user] = useAuthState(firebase.auth());
  const [refresh, toggleRefresh] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [orderByName, toggleOrderByName] = useState(false);
  const [hideCompleted, toggleHideCompleted] = useState(false);
  const history = useHistory();
  const client = history.location.state;
  const searchProperties = ["client_name", "title"];
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
      const unsubscribe = getJobs(
        user.uid,
        setJobs,
        orderByName,
        hideCompleted
      );
      return () => unsubscribe();
    }
  }, [user, orderByName, hideCompleted, refresh]);

  return (
    user && (
      <>
        <ListLayout
          data={jobs}
          filters={filters}
          searchProperties={searchProperties}
          Card={JobCard}
          refresh={refresh}
          toggleRefresh={toggleRefresh}
          cardID={"job_id"}
          noDataMessage={"No job found"}
          {...props}
        />
        {isPopped && <AddJob {...props} clientProp={client} />}
      </>
    )
  );
};

export default Jobs;
