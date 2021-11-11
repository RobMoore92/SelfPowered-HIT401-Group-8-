import {
  IonButton,
  IonFabButton,
  IonIcon,
  IonItem,
  IonTitle,
  useIonToast,
} from "@ionic/react";
import * as yup from "yup";
import { arrowBack } from "ionicons/icons";
import { Formik } from "formik";
import TextInput from "../TextInput/TextInput";
import React from "react";

const ChangeUsernameForm = ({ setPage, user, setLoginPopped }) => {
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
        window.location.reload();
        present({
          buttons: [{ text: "hide", handler: () => dismiss() }],
          message: "Username updated",
          color: "success",
          duration: 2000,
        });
      })
      .catch((e) => {
        setPage("account");
        if (e.code === "auth/requires-recent-login") {
          setLoginPopped(true);
        } else {
          present({
            buttons: [{ text: "hide", handler: () => dismiss() }],
            message: e.code,
            color: "danger",
            duration: 2000,
          });
        }
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

export default ChangeUsernameForm;
