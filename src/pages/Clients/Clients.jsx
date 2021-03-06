import React, { useContext, useEffect, useState } from "react";
import firebase from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getClients } from "../../firebase/queries/clientQueries";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import ClientCard from "../../components/cards/ClientCard/ClientCard";
import AddClient from "../../components/form/AddClient/AddClient";
import { useLocation } from "react-router";
import ClientHelp from "../../components/help/ClientHelp/ClientHelp";
import { GlobalContext } from "../../App";

const Clients = (props) => {
  const { helpPopped, setHelpPopped } = props;
  const location = useLocation();
  const { help } = useContext(GlobalContext);
  const [user] = useAuthState(firebase.auth());
  const [clients, setClients] = useState([]);
  const [showInactive, setShowInactive] = useState(false);
  const [orderCompany, setOrderCompany] = useState(true);
  const searchProperties = ["name", "company", "phone", "email"];
  const filters = [
    {
      title: "Show Inactive",
      show: showInactive,
      setShow: setShowInactive,
    },
    {
      title: "Order By Company",
      show: orderCompany,
      setShow: setOrderCompany,
    },
  ];

  useEffect(() => {
    if (user) {
      const unsubscribe = getClients(
        user.uid,
        setClients,
        showInactive,
        orderCompany
      );
      return () => unsubscribe();
    }
  }, [user, showInactive, orderCompany, location]);

  return (
    <>
      <ListLayout
        data={clients}
        filters={filters}
        searchProperties={searchProperties}
        Card={ClientCard}
        cardID={"client_id"}
        noDataMessage={"There are currently no clients, you can add one above."}
      />
      {help && <ClientHelp isPopped={helpPopped} setPopped={setHelpPopped} />}
      <AddClient {...props} />
    </>
  );
};

export default Clients;
