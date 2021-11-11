import React, { useState } from "react";
import Popover from "./PopoverContainer/PopoverContainer";
import firebase from "../../firebase/firebase";
import {
  IonButton,
  IonItem,
  IonList,
  IonTitle,
  useIonToast,
} from "@ionic/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteAllDocuments } from "../../firebase/queries/documentQueries";
import { deleteAllJobs } from "../../firebase/queries/jobQueries";
import { useHistory } from "react-router";
import {
  deleteAllJobTags,
  deleteAllTags,
} from "../../firebase/queries/tagQueries";
import { deleteAllAccountTasks } from "../../firebase/queries/taskQueries";
import { deleteAllClients } from "../../firebase/queries/clientQueries";
import ChangeUsernameForm from "../form/ChangeUsernameForm";
import ChangeEmailForm from "../form/ChangeEmailForm";
import ChangePasswordForm from "../form/ChangePasswordForm";
import useIsOnline from "../hooks/useIsOffline";
import Login from "../auth/Login/Login";

const AccountPopover = (props) => {
  const [page, setPage] = useState("account");
  const [loginPopped, setLoginPopped] = useState(false);
  const [user] = useAuthState(firebase.auth());
  const hasUsername = user?.email.includes("@anonymous.com");
  return (
    user && (
      <>
        <Popover {...props}>
          {page === "account" && (
            <Account
              hasUsername={hasUsername}
              user={user}
              page={page}
              setPage={setPage}
            />
          )}
          {page === "username" && (
            <ChangeUsernameForm
              user={user}
              setPage={setPage}
              setLoginPopped={setLoginPopped}
            />
          )}
          {page === "email" && (
            <ChangeEmailForm
              user={user}
              setPage={setPage}
              setLoginPopped={setLoginPopped}
            />
          )}
          {page === "password" && (
            <ChangePasswordForm
              user={user}
              setPage={setPage}
              setLoginPopped={setLoginPopped}
            />
          )}
        </Popover>
        <Login required isPopped={loginPopped} setPopped={setLoginPopped} />
      </>
    )
  );
};

const Account = ({ setPage, hasUsername, user }) => {
  const isOnline = useIsOnline();
  const history = useHistory();
  const [present, dismiss] = useIonToast();

  return (
    <>
      <IonTitle className={"ion-no-padding mb-4 text-gray-600"}>
        Account Settings
      </IonTitle>
      <p className={"mb-4"}>
        {isOnline
          ? "Here you can change your account's username, email, password or even delete your entire account."
          : "You must be online to use change account details."}
      </p>
      <IonList>
        <IonItem className={"text-gray-700 w-full"}>
          <IonButton
            disabled={!hasUsername || !isOnline}
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
            disabled={hasUsername || !isOnline}
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
            disabled={!isOnline}
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
            disabled={!isOnline}
            onClick={() => {
              present({
                color: "danger",
                header: "Warning",
                message: "Are you sure you want to delete your account?",
                buttons: [
                  "Cancel",
                  {
                    text: "Yes",
                    handler: async () => {
                      const uid = user.uid;
                      await deleteAllAccountTasks(uid);
                      await deleteAllDocuments(uid);
                      await deleteAllJobTags(uid);
                      await deleteAllTags(uid);
                      await deleteAllJobs(uid);
                      await deleteAllClients(uid);
                      await user.delete().then(() => {
                        history.replace("/welcome");
                        present({
                          buttons: [{ text: "hide", handler: () => dismiss() }],
                          message: "Account has been deleted",
                          color: "success",
                          duration: 2000,
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

export default AccountPopover;
