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
import TextInput from "./TextInput";
import React from "react";

const ChangeEmailForm = ({ setPage, user }) => {
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

export default ChangeEmailForm;
