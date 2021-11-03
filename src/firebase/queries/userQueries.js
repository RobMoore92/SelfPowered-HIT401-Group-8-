import { db } from "../firebase";

export const getUserData = async (uid) => {
  return await db.collection("users").doc(uid).get();
};

export const toggleHelp = (uid, help) => {
  return db.collection("users").doc(uid).update({
    help: !help,
  });
};
export const toggleDocuments = (uid, documents) => {
  return db.collection("users").doc(uid).update({
    documents: !documents,
  });
};
