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

const ChangePasswordForm = ({ setPage, user }) => {
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

export default ChangePasswordForm;
