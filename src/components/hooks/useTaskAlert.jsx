import React, { useEffect, useState } from "react";
import firebase from "../../firebase/firebase";
import { getAllTasks } from "../../firebase/queries/taskQueries";
import { useAuthState } from "react-firebase-hooks/auth";
import { differenceInMinutes } from "date-fns";

export const useTaskAlert = (present, dismiss) => {
  const [user, loading] = useAuthState(firebase.auth());
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (user) {
      getAllTasks(setTasks, user);
    }
  }, [user]);
  useEffect(() => {
    if (user && tasks.length > 0) {
      const interval = setInterval(() => {
        tasks.forEach((task) => {
          const difference = differenceInMinutes(new Date(), task.due);
          if (difference === -5) {
            present({
              buttons: [{ text: "hide", handler: () => dismiss() }],
              message: `${task.task} is due in 5 minutes.`,

              color: "warning",
              duration: 5000,
            });
          }
          if (difference === 0) {
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
    }
  }, [tasks, loading]);
  return tasks;
};
