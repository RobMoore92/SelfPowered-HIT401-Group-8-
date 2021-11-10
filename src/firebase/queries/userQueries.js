import firebase, { db } from "../firebase";

export const login = (
  values,
  present,
  dismiss,
  resetForm,
  setPopped,
  history
) => {
  const successMessage = () => {
    present({
      color: "success",
      buttons: [{ text: "hide", handler: () => dismiss() }],
      message: "You have successfully logged in",
      duration: 3000,
    });
  };
  const errorMessage = (e) => {
    present({
      color: "danger",
      buttons: [{ text: "hide", handler: () => dismiss() }],
      message: e.message,
      duration: 3000,
    });
  };
  const email =
    values.email === "" ? `${values.username}@anonymous.com` : values.email;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, values.password)
    .then(() => {
      setPopped(false);
      resetForm({});
      successMessage();
      history.push("/overview");
    })
    .catch((e) => {
      resetForm({});
      errorMessage(e);
    });
};

export const googleLogin = (present, dismiss, setPopped, history) => {
  const successMessage = () => {
    present({
      color: "success",
      buttons: [{ text: "hide", handler: () => dismiss() }],
      message: "You have successfully logged in",
      duration: 3000,
    });
  };
  const errorMessage = (e) => {
    present({
      color: "danger",
      buttons: [{ text: "hide", handler: () => dismiss() }],
      message: e.message,
      duration: 3000,
    });
  };
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      setPopped(false);
      successMessage();
      history.push("/overview");
    })
    .catch((e) => {
      errorMessage(e);
    });
};

export const signUp = (
  user,
  values,
  resetForm,
  present,
  dismiss,
  setPopped,
  history
) => {
  const successMessage = () => {
    present({
      color: "success",
      buttons: [{ text: "hide", handler: () => dismiss() }],
      message: "You have successfully logged in",
      duration: 5000,
    });
  };
  const errorMessage = (e) => {
    present({
      color: "danger",
      buttons: [{ text: "hide", handler: () => dismiss() }],
      message: e.message,
      duration: 5000,
    });
  };
  let email =
    values.email === "" ? `${values.username}@anonymous.com` : values.email;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, values.password)
    .then(({ user }) => {
      db.collection("users")
        .doc(user.uid)
        .set({
          help: true,
          documents: true,
        })
        .then(() => {
          setPopped(false);
          resetForm({});
          successMessage();
          history.push("/clients");
        });
    })
    .catch((e) => {
      resetForm({});
      errorMessage(e);
    });
};
export const logout = (present, dismiss, history) => {
  const successMessage = () => {
    present({
      color: "success",
      buttons: [{ text: "hide", handler: () => dismiss() }],
      message: "You have logged out",
      duration: 2000,
    });
  };
  const errorMessage = (e) => {
    present({
      color: "danger",
      buttons: [{ text: "hide", handler: () => dismiss() }],
      message: e.message,
      duration: 2000,
    });
  };
  firebase
    .auth()
    .signOut()
    .then(() => {
      history.replace("/welcome");
      successMessage();
    })
    .catch((e) => {
      errorMessage(e);
    });
};

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
