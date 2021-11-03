import { db } from "./firebase";

/*  firebase doesn't allow conditional queries so we've added a 
    dummy field called "null" to switch between if users don't
    want to order by important 
*/
export const getClients = (
  uid,
  setClients,
  orderCompany,
  showImportant,
  showInactive
) => {
  console.log("getting clients")
  let query = db.collection("users").doc(uid).collection("clients");
  if (!showInactive) {
    query = query.where("active", "==", true);
  }
  if (showImportant) {
    query = query.orderBy("important", "desc");
  }
  if (orderCompany) {
    query = query.orderBy("company");
  } else {
    query = query.orderBy("firstName");
  }
  return query.onSnapshot((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      client_id: doc.id,
      name: `${doc.data().firstName} ${doc.data().lastName}`,
      ...doc.data(),
    }));
    setClients(data);
  });
};

export const getJobs = (uid, setJobs, orderByName, hideCompleted) => {
  console.log("getting jobs")
  let query = db.collection("users").doc(uid).collection("jobs");
  if(hideCompleted) {
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
}


export const getTasks = (uid, job_id, setTasks) => {

  let query = db.collection("users").doc(uid).collection("jobs").doc(job_id).collection("tasks");
  return query.onSnapshot((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      task_id: doc.id,
      ...doc.data(),
    }));
    console.log(data);
    setTasks(data);
  });
}

export const completeJob =  (uid, id, completed) => {

 db.collection("users")
      .doc(uid)
      .collection("jobs")
      .doc(id)
      .update({ completed: completed });
};

export const getAllClients = (uid, setClients) => {
  console.log("getting clients")
  const query = db.collection("users").doc(uid).collection("clients");
  query.onSnapshot(querySnapshot => {
    const data = querySnapshot.docs.map(doc => ({
      value: doc.id,
      text: `${doc.data().firstName} ${doc.data().lastName}`,
    }));
    setClients(data)
  })
}

export const getUserInfo = (uid, setUserInfo) =>
  db
    .collection("users")
    .doc(uid)
    .onSnapshot((doc) => {
      setUserInfo(doc.data());
    });

export const updateClient = (uid, id, values) => {
  db.collection("users").doc(uid).collection("clients").doc(id).update(values);
};

export const updateClientActive = (uid, id, active) => {
  db.collection("users")
    .doc(uid)
    .collection("clients")
    .doc(id)
    .update({ active: active });
};

export const updateClientImportant = (uid, id, important) => {
  db.collection("users")
    .doc(uid)
    .collection("clients")
    .doc(id)
    .update({ important: important });
};

export const deleteClient = (uid, id) => {
  db.collection("users").doc(uid).collection("clients").doc(id).delete();
};

export const deleteJob = (uid, id) => {
  db.collection("users").doc(uid).collection("jobs").doc(id).delete();
};

export const deleteTask = (uid, job_id, task_id) => {
  db.collection("users").doc(uid).collection("jobs").doc(job_id).collection("tasks").doc(task_id).delete();
};
