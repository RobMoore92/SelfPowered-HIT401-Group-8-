<<<<<<< HEAD
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
=======
import {
    IonFabButton,
    IonIcon,
    IonLabel,
    IonList,
    IonSearchbar, IonText,
    IonToggle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ClientCard from "../../components/cards/ClientCard/ClientCard";
import { auth, db } from "../../firebase/firebase";
import FuzzySearch from "fuzzy-search";
import AddClient from "../../components/form/AddClient";
import { getClients } from "../../firebase/database";
import { AnimatePresence, motion } from "framer-motion";
import {addOutline, personCircleOutline} from "ionicons/icons";

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 250,
  mass: 0.6
};

const ShowInactive = ({ showInactive, setShowInactive }) => {
  return (
    <div className="flex items-center">
      <IonLabel className="text-xs" for="inactive-input">
        Show Inactive
      </IonLabel>
      <IonToggle
        name="inactive-input"
        checked={showInactive}
        onIonChange={() => setShowInactive(!showInactive)}
      />
    </div>
  );
};

const ShowImportant = ({ showImportant, setImportantShow }) => {
  return (
    <div className="flex items-center">
      <IonLabel className="text-xs" for="important-input">
        Important First
      </IonLabel>
      <IonToggle
        name="important-input"
        checked={showImportant}
        onIonChange={() => setImportantShow(!showImportant)}
      />
    </div>
  );
};

const OrderCompany = ({ companyOrder, setCompanyOrder }) => {
  return (
    <div className="flex items-center ">
      <IonLabel className="text-xs" for="order-input">
        Order By Company
      </IonLabel>
      <IonToggle
        name="order-input"
        checked={companyOrder}
        onIonChange={() => {
          setCompanyOrder(!companyOrder);
        }}
      />
    </div>
  );
};

export default (props) => {
  const { addPopped, setAddPopped } = props;
  const [user, loading] = useAuthState(auth);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [showImportant, setImportantShow] = useState(true);
  const [companyOrder, setCompanyOrder] = useState(true);

  const searcher = new FuzzySearch(clients, [
    "name",
    "firstName",
    "lastName",
    "company",
    "phone",
    "email",
  ]);

  useEffect(() => {
    if (user) {
      getClients(
        user.uid,
        setClients,
        companyOrder,
        showImportant,
        showInactive
      );
    }
  }, [loading, companyOrder, showImportant, showInactive]);

  return (
    <div className="flex flex-grow flex-col justify-between h-full">
      <div>
        <IonSearchbar
          className="mt-3"
          value={search}
          onIonChange={(e) => setSearch(e.detail.value)}
        />
        <div
          className={
            "flex justify-center items-end xs:justify-end flex-col sm:flex-row"
          }
        >
          <ShowInactive
            showInactive={showInactive}
            setShowInactive={setShowInactive}
          />
          <ShowImportant
            showImportant={showImportant}
            setImportantShow={setImportantShow}
          />
          <OrderCompany
            companyOrder={companyOrder}
            setCompanyOrder={setCompanyOrder}
          />
        </div>
          {clients.length === 0 && <NoClients {...props}/>}
        <IonList className={"ion-no-padding ion-no-margin h-full"} lines="none">
          <AnimatePresence>
            {searcher.search(search).map((item) => {
              return (
                <motion.div
                  transition={spring}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={item.id}
                >
                  <ClientCard {...item} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </IonList>
      </div>
      <AddClient isPopped={addPopped} setPopped={setAddPopped} />
    </div>
  );
};

const NoClients = ({setAddPopped}) => {
    return(
        <div className={"flex flex-col justify-center items-center h-full"}>
            <IonFabButton
                slot="end"
                className="h-9 w-9 mb-4 lg:mb-8"
                color="tertiary"
                onClick={() => {
                    setAddPopped(true)
                }}
            >
                <IonIcon icon={addOutline} />
            </IonFabButton>
            <IonText className={"font-medium lg:text-2xl px-8 text-center"}>You currently have no clients, add one to continue.</IonText>
        </div>
    )
}
>>>>>>> 9e8b36b8532e5afc3f720aa2f0426e27de2c6bec
