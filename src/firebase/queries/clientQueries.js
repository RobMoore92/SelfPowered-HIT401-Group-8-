import { db } from "../firebase";

export const getClients = (uid, setClients, showInactive, orderCompany) => {
  let query = db.collection("users").doc(uid).collection("clients");
  if (!showInactive) {
    query = query.where("active", "!=", false);
    query = query.orderBy("active");
  }
  query = query.orderBy("important", "desc");
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
export const deleteAllClients = (uid) => {
  return db
    .collection("users")
    .doc(uid)
    .collection("client")
    .get()
    .then((snap) => {
      snap.forEach(async (doc) => {
        await doc.ref.delete();
      });
    });
};

export const getClientNames = (uid, setClients) => {
  const query = db.collection("users").doc(uid).collection("clients");
  return query.onSnapshot((querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      value: doc.id,
      text: `${doc.data().firstName} ${doc.data().lastName}`,
    }));
    setClients(data);
  });
};

export const addClient = (uid, values, setPopped, present, dismiss) => {
  db.collection("users")
    .doc(uid)
    .collection("clients")
    .doc()
    .set({
      ...values,
      important: false,
      active: true,
      dummy: true,
      queryName: `${values.firstName.toLowerCase()} ${values.lastName.toLowerCase()}`,
    })
    .then(() => {
      setPopped(false);
      present({
        buttons: [{ text: "hide", handler: () => dismiss() }],
        message: "Client successfully added",
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

export const editClient = (uid, values, setPopped, present, dismiss) => {
  db.collection("users")
    .doc(uid)
    .collection("clients")
    .doc(values.client_id)
    .update({
      ...values,
      queryName: `${values.firstName.toLowerCase()} ${values.lastName.toLowerCase()}`,
    })
    .then(() => {
      setPopped(false);
      present({
        buttons: [{ text: "hide", handler: () => dismiss() }],
        message: "Client successfully updated",
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

export const deleteClient = (uid, id) => {
  db.collection("users").doc(uid).collection("clients").doc(id).delete();
};

export const updateClientActive = (uid, id, active) => {
  console.log(uid, id, active);
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
