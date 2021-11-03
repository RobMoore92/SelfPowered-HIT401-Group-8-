import React, { useEffect, useState } from "react";
import { useIonToast } from "@ionic/react";
import firebase, { db } from "../../firebase/firebase";
import { getTasks } from "../../firebase/queries/taskQueries";
import { useAuthState } from "react-firebase-hooks/auth";
import { differenceInMinutes } from "date-fns";

export const useTaskAlert = (present, dismiss) => {
  const [user, loading] = useAuthState(firebase.auth());
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (user) {
      db.collectionGroup("tasks").onSnapshot(async (snap) => {
        const temp = [];
        snap.docs.forEach((doc) => {
          if (doc.ref.parent.parent.parent.parent.id === user.uid) {
            temp.push({
              task: doc.data().task,
              due: new Date(doc.data().due.seconds * 1000),
            });
          }
        });
        setTasks(temp);
      });
    }
  }, [user]);
  useEffect(() => {
    const interval = setInterval(() => {
      tasks.forEach((task) => {
        const difference = differenceInMinutes(new Date(), task.due);
        console.log(difference);
        if (difference === -5) {
          console.log("dueeee");
          present({
            buttons: [{ text: "hide", handler: () => dismiss() }],
            message: `${task.task} is due in 5 minutes.`,

            color: "warning",
            duration: 5000,
          });
        }
        if (difference === 0) {
          console.log("dueeee");
          present({
            buttons: [{ text: "hide", handler: () => dismiss() }],
            message: `${task.task} is due now.`,
            color: "warning",
            duration: 5000,
          });
        }
      });
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, [tasks, loading]);
  return tasks;
};
