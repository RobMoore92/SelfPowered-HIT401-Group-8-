<<<<<<< HEAD
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

import {auth, db} from "../../firebase/firebase";
import FuzzySearch from "fuzzy-search";

import { getTasks} from "../../firebase/database";
import {AnimatePresence, motion} from "framer-motion";
import {addOutline, personCircleOutline} from "ionicons/icons";

import AddTask from "../../components/form/AddTask";
import TaskCard from "../../components/cards/TaskCard/TaskCard";

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
    const {addPopped, setAddPopped, jobDetails} = props;
    const [refresh, setRefresh] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [hideCompleted, setHideCompleted] = useState(true);
    const [orderByName, setOrderByName] = useState(true);

    const searcher = new FuzzySearch(tasks, [
        "client_name",
        "title",
    ]);

    useEffect(() => {
        console.log(jobDetails)
        if (user) {
            const unsubscribe = getTasks(
                user.uid,
                jobDetails.job_id,
                setTasks,
            );
            return () => unsubscribe();
        }
    }, [loading, refresh]);

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
                {tasks.length === 0 && <NoTasks {...props}/>}
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
                                 <TaskCard {...item} {...jobDetails}/>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </IonList>
            </div>
            <AddTask {...jobDetails} setRefresh={setRefresh} refresh={refresh} isPopped={addPopped} setPopped={setAddPopped}/>
        </div>
    );
};

const NoTasks = ({setAddPopped}) => {
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
            <IonText className={"font-medium lg:text-2xl px-8 text-center"}>You currently have no tasks, or they are
                being filtered.</IonText>
        </div>
    )
}
>>>>>>> 9e8b36b8532e5afc3f720aa2f0426e27de2c6bec
