<<<<<<< HEAD
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
=======
import {
    IonFabButton,
    IonIcon,
    IonLabel,
    IonList, IonRefresher, IonRefresherContent,
    IonSearchbar, IonText,
    IonToggle,
} from "@ionic/react";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import ClientCard from "../../components/cards/ClientCard/ClientCard";
import {auth, db} from "../../firebase/firebase";
import FuzzySearch from "fuzzy-search";
import AddClient from "../../components/form/AddClient";
import {getClients, getJobs} from "../../firebase/database";
import {AnimatePresence, motion} from "framer-motion";
import {addOutline, personCircleOutline} from "ionicons/icons";
import AddJob from "../../components/form/AddJob";
import JobCard from "../../components/cards/JobCard/JobCard";

const spring = {
    type: "spring",
    damping: 20,
    stiffness: 250,
    mass: 0.2
};


const HideCompleted = ({hideCompleted, setHideCompleted}) => {
    return (
        <div className="flex items-center">
            <IonLabel className="text-xs" for="important-input">
                Hide Completed
            </IonLabel>
            <IonToggle
                name="important-input"
                checked={hideCompleted}
                onIonChange={() => {
                    setHideCompleted(!hideCompleted)
                }}
            />
        </div>
    );
};

const OrderByName = ({orderByName, setOrderByName}) => {
    return (
        <div className="flex items-center ">
            <IonLabel className="text-xs" for="order-input">
                Order By Name
            </IonLabel>
            <IonToggle
                name="order-input"
                checked={orderByName}
                onIonChange={() => {
                    setOrderByName(!orderByName);
                }}
            />
        </div>
    );
};

export default (props) => {
    const {addPopped, setAddPopped} = props;
    const [refresh, setRefresh] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [hideCompleted, setHideCompleted] = useState(true);
    const [orderByName, setOrderByName] = useState(true);

    const searcher = new FuzzySearch(jobs, [
        "client_name",
        "title",
    ]);

    useEffect(() => {

        if (user) {
            const unsubscribe = getJobs(
                user.uid,
                setJobs,
                orderByName,
                hideCompleted,
            );
            return () => unsubscribe();
        }
    }, [loading, orderByName, hideCompleted, refresh]);

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
                    <HideCompleted
                        hideCompleted={hideCompleted}
                        setHideCompleted={setHideCompleted}
                    />
                    <OrderByName
                        orderByName={orderByName}
                        setOrderByName={setOrderByName}
                    />
                </div>
                {jobs.length === 0 && <NoClients {...props}/>}
                <IonList className={"ion-no-padding ion-no-margin h-full"} lines="none">
                    <AnimatePresence>
                        {searcher.search(search).map((item) => {
                            return (
                                <motion.div
                                    transition={spring}
                                    layout
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    key={item.id}
                                >
                                    <JobCard refresh={refresh} setRefresh={setRefresh} {...item} />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </IonList>
            </div>
            <AddJob setRefresh={setRefresh} refresh={refresh} isPopped={addPopped} setPopped={setAddPopped}/>
        </div>
    );
};

const NoClients = ({setAddPopped}) => {
    return (
        <div className={"flex flex-col justify-center items-center h-full"}>
            <IonFabButton
                slot="end"
                className="h-9 w-9 mb-4 lg:mb-8"
                color="tertiary"
                onClick={() => {
                    setAddPopped(true)
                }}
            >
                <IonIcon icon={addOutline}/>
            </IonFabButton>
            <IonText className={"font-medium lg:text-2xl px-8 text-center"}>You currently have no jobs, or they are
                being filtered.</IonText>
        </div>
    )
}
>>>>>>> 9e8b36b8532e5afc3f720aa2f0426e27de2c6bec
