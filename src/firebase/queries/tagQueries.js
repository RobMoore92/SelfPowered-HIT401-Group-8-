import { db } from "../firebase";

export const getTagsByJob = (user, job_id, setTagList) => {
  db.collection("users")
    .doc(user.uid)
    .collection("jobs")
    .doc(job_id)
    .collection("jobTags")
    .onSnapshot((snap) => {
      const data = snap.docs.map((tag) => {
        return { tag_id: tag.id, ...tag.data() };
      });
      setTagList(data);
    });
};

export const getAllTags = (user, setTags) => {
  db.collection("users")
    .doc(user.uid)
    .collection("tags")
    .get()
    .then((snap) => {
      const data = snap.docs.map((tag) => ({
        ...tag.data(),
        task_id: tag.id,
      }));
      setTags(data);
    });
};

export const insertTag = (user, values, setAddTag) => {
  db.collection("users")
    .doc(user.uid)
    .collection("tags")
    .doc()
    .set({
      ...values,
    })
    .then(() => {
      setAddTag(false);
    });
};

export const deleteTagByJob = (user, job_id, tag_id) => {
  db.collection("users")
    .doc(user.uid)
    .collection("jobs")
    .doc(job_id)
    .collection("jobTags")
    .doc(tag_id)
    .delete()
    .then(() => {
      console.log(tag_id);
      console.log("deleted");
    })
    .catch((e) => console.log(e.message));
};

export const deleteTag = async (user, job_id, task_id) => {
  await db
    .collection("users")
    .doc(user.uid)
    .collection("tags")
    .doc(task_id)
    .delete();
  await db
    .collectionGroup("jobTags")
    .get()
    .then((snap) => {
      snap.forEach((tag) => {
        console.log(user.uid, tag.ref.parent.parent.parent.parent.id);
        if (tag.ref.parent.parent.parent.parent.id === user.uid) {
          console.log(task_id, tag.id, tag.ref.id);
          tag.ref.delete();
        }
      });
    });
};

export const deleteAllJobTags = async (uid) => {
  await db
    .collectionGroup("jobTags")
    .get()
    .then((snap) => {
      snap.forEach((tag) => {
        if (tag.ref.parent.parent.parent.parent.id === uid) {
          tag.ref.delete();
        }
      });
    });
};

export const deleteAllTags = async (uid) => {
  await db
    .collectionGroup("tags")
    .get()
    .then((snap) => {
      snap.forEach((tag) => {
        if (tag.ref.parent.parent.id === uid) {
          tag.ref.delete();
        }
      });
    });
};
