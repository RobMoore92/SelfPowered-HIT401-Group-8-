import { db } from "../firebase";
import { deleteDocumentsByJob } from "./documentQueries";
import { deleteAllTasks } from "./taskQueries";

export const getJobs = (uid, setJobs, orderByName, hideCompleted) => {
  let query = db.collection("users").doc(uid).collection("jobs");
  if (hideCompleted) {
    query = query.where("completed", "==", false);
  }
  if (orderByName) {
    query = query.orderBy("title_query", "asc");
  } else {
    query = query.orderBy("due", "asc");
  }
  return query.onSnapshot((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      job_id: doc.id,
      ...doc.data(),
    }));
    setJobs(data);
  });
};

export const getJob = async (uid, job_id) =>
  await db.collection("users").doc(uid).collection("job").doc(job_id).get();

export const getJobsByClient = (
  uid,
  client_id,
  setJobs,
  orderByName,
  hideCompleted
) => {
  console.log(uid, client_id, 123);
  let query = db
    .collection("users")
    .doc(uid)
    .collection("jobs")
    .where("client_id", "==", client_id);
  if (hideCompleted) {
    query = query.where("completed", "==", false);
  }
  if (orderByName) {
    query = query.orderBy("title_query", "asc");
  } else {
    query = query.orderBy("due", "asc");
  }
  return query.onSnapshot((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      job_id: doc.id,
      ...doc.data(),
    }));
    setJobs(data);
  });
};

export const addJob = (uid, values, client) => {
  console.log(uid, values, client);
  return db
    .collection("users")
    .doc(uid)
    .collection("jobs")
    .doc()
    .set({
      ...values,
      important: false,
      completed: false,
      dummy: true,
      title_query: values.title.toLowerCase(),
      client_id: client.id,
      client_name: client.name,
    });
};

export const editJob = (
  uid,
  values,
  editValues,
  client,
  setPopped,
  present,
  dismiss
) => {
  db.collection("users")
    .doc(uid)
    .collection("jobs")
    .doc(editValues.job_id)
    .update({
      ...values,
      client_id: client.id,
      client_name: client.name,
      title_query: values.title.toLowerCase(),
    })
    .then(() => {
      setPopped(false);
      present({
        buttons: [{ text: "hide", handler: () => dismiss() }],
        message: "Job successfully updated",
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

export const deleteAllJobs = (uid) => {
  return db
    .collection("users")
    .doc(uid)
    .collection("jobs")
    .get()
    .then((snap) => {
      snap.forEach(async (doc) => {
        await doc.ref.delete();
      });
    });
};

export const deleteJob = (uid, id) => {
    db.collection("users")
      .doc(uid)
      .collection("jobs")
      .doc(id)
      .delete()
      .then(async () => {
        await deleteDocumentsByJob(uid, id);
        await deleteAllTasks(uid, id);
      });
};

export const completeJob = (uid, id, completed) => {
  return db
    .collection("users")
    .doc(uid)
    .collection("jobs")
    .doc(id)
    .update({ completed: completed });
};
