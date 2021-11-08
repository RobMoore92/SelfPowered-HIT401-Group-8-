import React, { useState } from "react";
import Popover from "./PopoverContainer/PopoverContainer";
import firebase from "../../firebase/firebase";
import {
  IonButton,
  IonItem,
  IonList,
  IonText,
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

const AccountPopover = (props) => {
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
        {page === "username" && (
          <ChangeUsernameForm user={user} setPage={setPage} />
        )}
        {page === "email" && <ChangeEmailForm user={user} setPage={setPage} />}
        {page === "password" && (
          <ChangePasswordForm user={user} setPage={setPage} />
        )}
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
