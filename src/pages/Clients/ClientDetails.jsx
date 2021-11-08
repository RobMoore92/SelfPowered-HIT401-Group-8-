import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getJobsByClient } from "../../firebase/queries/jobQueries";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import JobCard from "../../components/cards/JobCard/JobCard";
import AddJob from "../../components/form/AddJob";
import { GlobalContext } from "../../App";

const ClientDetails = (props) => {
  const { user } = useContext(GlobalContext);
  const location = useLocation();
  const [refresh, toggleRefresh] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [orderByName, toggleOrderByName] = useState(false);
  const [hideCompleted, toggleHideCompleted] = useState(false);
  const history = useHistory();
  const client = history.location.state?.clientDetails;
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
      const unsubscribe = getJobsByClient(
        user?.uid,
        client?.client_id,
        setJobs,
        orderByName,
        hideCompleted
      );
      return () => unsubscribe();
    }
  }, [user, orderByName, hideCompleted, location]);

  return (
    user && (
      <>
        <ListLayout
          data={jobs}
          parent={client}
          filters={filters}
          searchProperties={searchProperties}
          Card={JobCard}
          refresh={refresh}
          toggleRefresh={toggleRefresh}
          cardID={"job_id"}
          noDataMessage={"No job found"}
          {...props}
        />
        <AddJob {...props} clientProp={client} />
      </>
    )
  );
};

export default ClientDetails;
