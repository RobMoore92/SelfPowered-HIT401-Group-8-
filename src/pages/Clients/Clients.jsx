import React, { useEffect, useState } from "react";
import firebase from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getClients } from "../../firebase/queries/clientQueries";
import ListLayout from "../../layouts/ListLayout";
import ClientCard from "../../components/cards/ClientCard/ClientCard";
import AddClient from "../../components/form/AddClient";

const Clients = (props) => {
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
      getClients(user.uid, setClients, showInactive, orderCompany);
    }
  }, [user, showInactive, orderCompany]);

  return (
    <>
      <ListLayout
        data={clients}
        filters={filters}
        searchProperties={searchProperties}
        Card={ClientCard}
        cardID={"client_id"}
        noDataMessage={"There is no client"}
      />
      <AddClient {...props} />
    </>
  );
};

export default Clients;