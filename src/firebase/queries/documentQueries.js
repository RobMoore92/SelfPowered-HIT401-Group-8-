import { db, storage } from "../firebase";

export const deleteClient = (uid, id) => {
  db.collection("users").doc(uid).collection("clients").doc(id).delete();
};

export const addDocument = (
  uid,
  id,
  file,
  setProgress,
  refresh,
  setRefresh
) => {
  const storageRef = storage.ref(`${uid}/job/${id}/${file.name}`);
  storageRef.put(file).on(
    "state_changed",
    (snapshot) => {
      const progress = snapshot.bytesTransferred / snapshot.totalBytes;
      setProgress(progress);
    },
    (error) => {
      console.log(error, 123);
    },
    () => {
      setRefresh(!refresh);
      setProgress(0);
    }
  );
};

export const getAllDocuments = (uid, setDocs) => {
  setDocs([]);
  db.collection("users")
    .doc(uid)
    .collection("jobs")
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs.map(async (doc) => {
        const storageRef = storage.ref(`${uid}/job/${doc.id}/`);
        const listAll = await storageRef.listAll();
        const metadata = listAll.items.map(
          async (r) => await r.getMetadata((r) => r)
        );
        const documents = await Promise.all(metadata);
        if (documents.length > 0) {
          setDocs((docs) => [
            ...docs,
            {
              job_name: doc.data().title,
              documents: documents,
            },
          ]);
        }
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

export const deleteDocumentsByJob = async (uid, id) => {
  const storageRef = storage.ref(`${uid}/job/${id}/`);
  const listAll = await storageRef.listAll();
  listAll.items.map((item) => {
    item.delete().then((r) => {
      console.log(r);
      console.log("deleted");
    });
  });
};

export const deleteAllDocuments = async (uid) => {
  const jobs = db.collection("users").doc(uid).collection("jobs").get();
  jobs.then((snap) => {
    snap.docs.map((item) => {
      deleteDocumentsByJob(uid, item.id);
    });
  });
};

export const listDocuments = async (uid, id) => {
  const storageRef = storage.ref(`${uid}/job/${id}/`);
  const listAll = await storageRef.listAll();
  const metadata = listAll.items.map(
    async (r) => await r.getMetadata((r) => r)
  );
  return await Promise.all(metadata);
};

export const downloadDocument = (fullPath) => {
  const storageRef = storage.ref(fullPath);
  return storageRef.getDownloadURL();
};
export const deleteDocument = (fullPath, setRefresh, refresh) => {
  storage
    .ref(fullPath)
    .delete()
    .then(() => {
      setRefresh(!refresh);
    })
    .catch((error) => console.log(error, 23123123));
};
