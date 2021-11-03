import { db } from "../firebase";
import firebase from "../../firebase/firebase";

export const getTasks = (
  uid,
  setTasks,
  orderByName,
  hideCompleted,
  refresh,
  setRefresh
) => {
  let query = db.collectionGroup("tasks");
  if (hideCompleted) {
    query = query.where("completed", "==", false);
  }
  if (orderByName) {
    query = query.orderBy("title_query", "asc");
  } else {
    query = query.orderBy("due", "asc");
  }

  return query.onSnapshot(async (snap) => {
    const data = await snap.docs.map((doc) => {
      if (doc.ref.parent.parent.parent.parent.id === uid) {
        return { task_id: doc.id, ...doc.data() };
      }
    });
    const filteredData = data.filter((el) => el != null);
    setTasks(filteredData);
  });
};

export const getTasksByJob = (
  uid,
  job_id,
  setTasks,
  orderByName,
  hideCompleted
) => {
  let query = db
    .collection("users")
    .doc(uid)
    .collection("jobs")
    .doc(job_id)
    .collection("tasks");
  if (hideCompleted) {
    query = query.where("completed", "==", false);
  }
  if (orderByName) {
    query = query.orderBy("title_query", "asc");
  } else {
    query = query.orderBy("due", "asc");
  }
  return query.onSnapshot((snap) => {
    const data = snap.docs.map((doc) => ({ task_id: doc.id, ...doc.data() }));
    setTasks(data);
  });
};

export const addTask = (uid, values, parent, setPopped, present, dismiss) => {
  const job = db
    .collection("users")
    .doc(uid)
    .collection("jobs")
    .doc(parent.job_id)
    .get();
  db.collection("users")
    .doc(uid)
    .collection("jobs")
    .doc(parent.job_id)
    .collection("tasks")
    .doc()
    .set({
      ...values,
      title_query: values.task.toLowerCase(),
      completed: false,
      job: { job_id: parent.job_id, ...parent },
    })
    .then(() => {
      setPopped(false);
      present({
        buttons: [{ text: "hide", handler: () => dismiss() }],
        message: "Task successfully added",
        color: "success",
        duration: 2000,
      });
    })
    .catch(({ message }) => {
      setPopped(false);
      present({
        buttons: [{ text: "hide", handler: () => dismiss() }],
        message: message,
        color: "danger",
        duration: 2000,
      });
    });
};

export const editTask = (
  uid,
  job_id,
  task_id,
  values,
  setPopped,
  present,
  dismiss,
  refresh,
  setRefresh
) => {
  db.collection("users")
    .doc(uid)
    .collection("jobs")
    .doc(job_id)
    .collection("tasks")
    .doc(task_id)
    .update({
      ...values,
    })
    .then(() => {
      setPopped(false);
      setRefresh(!refresh);
      present({
        buttons: [{ text: "hide", handler: () => dismiss() }],
        message: "Task successfully updated",
        color: "success",
        duration: 2000,
      });
    })
    .catch(({ message }) => {
      setPopped(false);
      setRefresh(!refresh);
      present({
        buttons: [{ text: "hide", handler: () => dismiss() }],
        message: message,
        color: "danger",
        duration: 2000,
      });
    });
};

export const completeTask = (
  uid,
  job_id,
  task_id,
  completed,
  refresh,
  setRefresh
) => {
  db.collection("users")
    .doc(uid)
    .collection("jobs")
    .doc(job_id)
    .collection("tasks")
    .doc(task_id)
    .update({ completed: completed });
};

export const deleteTask = (uid, job_id, task_id, refresh, setRefresh) => {
  console.log(uid, job_id, task_id);
  db.collection("users")
    .doc(uid)
    .collection("jobs")
    .doc(job_id)
    .collection("tasks")
    .doc(task_id)
    .delete()
    .then(() => {
      setRefresh(!refresh);
    });
};
