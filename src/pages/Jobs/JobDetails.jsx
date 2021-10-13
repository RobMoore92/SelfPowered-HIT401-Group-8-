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
