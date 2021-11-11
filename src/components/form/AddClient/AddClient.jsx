import { IonButton, IonList, useIonToast } from "@ionic/react";
import firebase from "../../../firebase/firebase";
import { Formik } from "formik";
import * as yup from "yup";
import TextInput from "../TextInput/TextInput";
import { useAuthState } from "react-firebase-hooks/auth";
import Popover from "../../popovers/PopoverContainer/PopoverContainer";
import { addClient, editClient } from "../../../firebase/queries/clientQueries";
import useIsOnline from "../../hooks/useIsOffline";

const initialValues = {
  firstName: "",
  lastName: "",
  company: "",
  phone: "",
  email: "",
};

const phoneReg =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(32, "first name is too long")
    .required("first name is required"),
  lastName: yup
    .string()
    .max(32, "last name is too long")
    .required("last name is required"),
  company: yup.string().max(32, "company name is too long"),
  phone: yup.string().matches(phoneReg, "phone number is not valid"),
  email: yup.string().email("email address is not valid"),
});

export default (props) => {
  const { editValues, setPopped, isPopped, mode } = props;
  const [user] = useAuthState(firebase.auth());
  const [present, dismiss] = useIonToast();
  const isOnline = useIsOnline();
  const onSubmit = (values) => {
    if (mode === "edit") {
      editClient(user.uid, values, setPopped, present, dismiss, !isOnline);
    } else {
      addClient(user.uid, values, setPopped, present, dismiss, !isOnline);
    }
  };
  return (
    isPopped && (
      <Popover {...props}>
        <div className="-mt-2">
          <Formik
            data-testid={"add-client"}
            initialValues={editValues || initialValues}
            validationSchema={validationSchema}
            validateOnMount={true}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              const { handleSubmit, isValidating, isValid } = formikProps;

              return (
                <IonList>
                  <TextInput
                    {...formikProps}
                    id="firstName"
                    label="First name"
                  />
                  <TextInput {...formikProps} id="lastName" label="Last name" />
                  <TextInput {...formikProps} id="company" label="Company" />
                  <TextInput
                    {...formikProps}
                    id="phone"
                    label="Phone number"
                    type="tel"
                  />
                  <TextInput
                    {...formikProps}
                    id="email"
                    label="Email address"
                    type="email"
                  />
                  <IonButton
                    className="w-full mt-4 pr-1"
                    onClick={handleSubmit}
                    disabled={isValidating || !isValid}
                  >
                    {editValues ? "Edit Client" : "Add Client"}
                  </IonButton>
                </IonList>
              );
            }}
          </Formik>
        </div>
      </Popover>
    )
  );
};
