import React, { useState } from "react";
import Popover from "../containers/Popover/Popover";
import firebase from "../../firebase/firebase";
import {
  IonButton,
  IonFabButton,
  IonIcon,
  IonItem,
  IonList,
  IonText,
  IonTitle,
  useIonToast,
} from "@ionic/react";

import TextInput from "../form/TextInput";
import { Formik } from "formik";
import * as yup from "yup";
import { arrowBack } from "ionicons/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteAllDocuments } from "../../firebase/queries/documentQueries";
import { deleteAllJobs } from "../../firebase/queries/jobQueries";
import { useHistory } from "react-router";

const SettingsPopover = (props) => {
  const [page, setPage] = useState("account");
  const [user] = useAuthState(firebase.auth());
  const hasUsername = user?.email.includes("@anonymous.com");
  return (
    user && (
      <Popover {...props}>
        {page === "account" && (
          <Account
            hasUsername={hasUsername}
            user={user}
            page={page}
            setPage={setPage}
          />
        )}
        {page === "username" && <UsernameForm user={user} setPage={setPage} />}
        {page === "email" && <EmailForm user={user} setPage={setPage} />}
        {page === "password" && <PasswordForm user={user} setPage={setPage} />}
      </Popover>
    )
  );
};

const Account = ({ setPage, hasUsername, user }) => {
  const history = useHistory();
  const [present, dismiss] = useIonToast();
  return (
    <>
      <IonTitle className={"ion-no-padding mb-4 text-gray-600"}>
        Account Settings
      </IonTitle>
      <IonText>Update your profile</IonText>
      <IonList>
        <IonItem className={"text-gray-700 w-full"}>
          <IonButton
            disabled={!hasUsername}
            onClick={() => {
              setPage("username");
            }}
            size="lg"
            className={"w-full"}
            expand={"full"}
          >
            Change Username
          </IonButton>
        </IonItem>
        <IonItem className={"text-gray-700 w-full"}>
          <IonButton
            disabled={hasUsername}
            onClick={() => {
              setPage("email");
            }}
            size="lg"
            className={"w-full"}
            expand={"full"}
          >
            Change Email
          </IonButton>
        </IonItem>
        <IonItem className={"text-gray-700 w-full"}>
          <IonButton
            onClick={() => {
              setPage("password");
            }}
            size="lg"
            className={"w-full"}
            expand={"full"}
          >
            Change Password
          </IonButton>
        </IonItem>
        <IonItem className={"text-gray-700 w-full"}>
          <IonButton
            onClick={() => {
              present({
                color: "danger",
                header: "Warning",
                message: "Are you sure you want to delete your account?",
                buttons: [
                  "Cancel",
                  {
                    text: "Yes",
                    handler: () => {
                      deleteAllDocuments(user.uid).then(() => {
                        deleteAllJobs(user.uid).finally(() => {
                          user.delete().then(() => {
                            history.replace("/welcome");
                            present({
                              buttons: [
                                { text: "hide", handler: () => dismiss() },
                              ],
                              message: "Account has been deleted",
                              color: "success",
                              duration: 2000,
                            });
                          });
                        });
                      });
                    },
                  },
                ],
              });
            }}
            color={"danger"}
            size="lg"
            className={"w-full"}
            expand={"full"}
          >
            Delete Account
          </IonButton>
        </IonItem>
      </IonList>
    </>
  );
};

const PasswordForm = ({ setPage, user }) => {
  const [present, dismiss] = useIonToast();
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };
  const validationSchema = yup.object().shape(
    {
      newPassword: yup.string().required().min(8).max(32),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Passwords must match")
        .required(),
    },
    [["confirm"]]
  );
  const onSubmit = (values) => {
    user
      .updatePassword(values.newPassword)
      .then(() => {
        setPage("account");
        present({
          buttons: [{ text: "hide", handler: () => dismiss() }],
          message: "Password updated",
          color: "success",
          duration: 2000,
        });
      })
      .catch((e) => {
        setPage("account");
        present({
          buttons: [{ text: "hide", handler: () => dismiss() }],
          message: e.message,
          color: "danger",
          duration: 2000,
        });
      });
  };
  return (
    <>
      <div className={"flex justify-between items-center mb-4"}>
        <IonTitle className={"ion-no-padding"}>Change Password</IonTitle>
        <IonFabButton
          data-testid="logout-button"
          onClick={() => {
            setPage("account");
          }}
          className="h-9 w-9"
          shape="round"
          size="small"
          translucent
        >
          <IonIcon size={"small"} color="light" icon={arrowBack} />
        </IonFabButton>
      </div>
      <form>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            return (
              <div>
                <TextInput
                  id={"newPassword"}
                  label={"Password"}
                  type={"password"}
                  {...formikProps}
                />
                <TextInput
                  id={"confirmPassword"}
                  label={"Confirm Password"}
                  type={"password"}
                  {...formikProps}
                />
                <IonItem className={"text-gray-700 w-full"}>
                  <IonButton
                    onClick={formikProps.handleSubmit}
                    size="lg"
                    className={"w-full"}
                    expand={"full"}
                  >
                    Update Password
                  </IonButton>
                </IonItem>
              </div>
            );
          }}
        </Formik>
      </form>
    </>
  );
};

const EmailForm = ({ setPage, user }) => {
  const [present, dismiss] = useIonToast();
  const initialValues = {
    email: "",
    confirmEmail: "",
  };
  const validationSchema = yup.object().shape(
    {
      email: yup.string().email(),
      confirm: yup
        .string()
        .oneOf([yup.ref("email"), null], "Email address must match"),
    },
    [["email"]]
  );
  const onSubmit = (values) => {
    user
      .updateEmail(values.email)
      .then(() => {
        setPage("account");
        present({
          buttons: [{ text: "hide", handler: () => dismiss() }],
          message: "Email updated",
          color: "success",
          duration: 2000,
        });
      })
      .catch((e) => {
        setPage("account");
        present({
          buttons: [{ text: "hide", handler: () => dismiss() }],
          message: e.message,
          color: "danger",
          duration: 2000,
        });
      });
  };
  return (
    <>
      <div className={"flex justify-between items-center mb-4"}>
        <IonTitle className={"ion-no-padding"}>Change Email</IonTitle>
        <IonFabButton
          data-testid="logout-button"
          onClick={() => {
            setPage("account");
          }}
          className="h-9 w-9"
          shape="round"
          size="small"
          translucent
        >
          <IonIcon size={"small"} color="light" icon={arrowBack} />
        </IonFabButton>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => {
          return (
            <div>
              <TextInput
                id={"email"}
                label={"Email"}
                type={"email"}
                {...formikProps}
              />
              <TextInput
                id={"confirm"}
                label={"Confirm Email"}
                type={"email"}
                {...formikProps}
              />
              <IonItem className={"text-gray-700 w-full"}>
                <IonButton
                  onClick={formikProps.handleSubmit}
                  size="lg"
                  className={"w-full"}
                  expand={"full"}
                >
                  Update Email
                </IonButton>
              </IonItem>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

const UsernameForm = ({ setPage, user }) => {
  const [present, dismiss] = useIonToast();
  const initialValues = {
    username: "",
    confirmUsername: "",
  };
  const validationSchema = yup.object().shape(
    {
      username: yup.string(),
      confirm: yup
        .string()
        .oneOf([yup.ref("username"), null], "Username must match"),
    },
    [["username"]]
  );
  const onSubmit = (values) => {
    const formattedEmail = values.username + "@anonymous.com";
    user
      .updateEmail(formattedEmail)
      .then(() => {
        setPage("account");
        present({
          buttons: [{ text: "hide", handler: () => dismiss() }],
          message: "Username updated",
          color: "success",
          duration: 2000,
        });
      })
      .catch((e) => {
        setPage("account");
        present({
          buttons: [{ text: "hide", handler: () => dismiss() }],
          message: e.message,
          color: "danger",
          duration: 2000,
        });
      });
  };
  return (
    <>
      <div className={"flex justify-between items-center mb-4"}>
        <IonTitle className={"ion-no-padding"}>Change Username</IonTitle>
        <IonFabButton
          data-testid="logout-button"
          onClick={() => {
            setPage("account");
          }}
          className="h-9 w-9"
          shape="round"
          size="small"
          translucent
        >
          <IonIcon size={"small"} color="light" icon={arrowBack} />
        </IonFabButton>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => {
          return (
            <div>
              <TextInput
                id={"username"}
                label={"Username"}
                type={"text"}
                {...formikProps}
              />
              <TextInput
                id={"confirm"}
                label={"Confirm Username"}
                type={"text"}
                {...formikProps}
              />
              <IonItem className={"text-gray-700 w-full"}>
                <IonButton
                  onClick={formikProps.handleSubmit}
                  size="lg"
                  className={"w-full"}
                  expand={"full"}
                >
                  Update Username
                </IonButton>
              </IonItem>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default SettingsPopover;
