<<<<<<< HEAD
import {
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonText,
  useIonToast,
} from "@ionic/react";
=======
import { IonButton, IonInput, IonItem, IonList, IonText } from "@ionic/react";
>>>>>>> 9e8b36b8532e5afc3f720aa2f0426e27de2c6bec
import firebase, { db } from "../../firebase/firebase";
import { Formik } from "formik";
import * as yup from "yup";
import TextInput from "../../components/form/TextInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import Popover from "../containers/Popover/Popover";
<<<<<<< HEAD
import { addClient, editClient } from "../../firebase/queries/clientQueries";
=======
>>>>>>> 9e8b36b8532e5afc3f720aa2f0426e27de2c6bec

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
<<<<<<< HEAD
  const { editValues, setPopped, isPopped, mode } = props;
  const [user] = useAuthState(firebase.auth());
  const [present, dismiss] = useIonToast();
  const onSubmit = (values) => {
    if (mode === "edit") {
      editClient(user.uid, values, setPopped, present, dismiss);
    } else {
      addClient(user.uid, values, setPopped, present, dismiss);
    }
  };
  return (
    isPopped && (
      <Popover {...props}>
        <div className="-mt-2">
          <Formik
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
=======
  const { editValues } = props;
  const history = useHistory();
  const [user] = useAuthState(firebase.auth());
  const onSubmit = (values) => {
    if (editValues) {
      db.collection("users")
        .doc(user.uid)
        .collection("clients")
        .doc(values.id)
        .update({ ...values })
        .then(() => {
          history.push("/clients");
          props.setPopped(false);
        })
        .catch((e) => console.log(e));
    } else {
      db.collection("users")
        .doc(user.uid)
        .collection("clients")
        .doc()
        .set({ ...values, important: false, active: true, dummy: true })
        .then(() => {
          history.push("/clients");
          props.setPopped(false);
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <Popover {...props}>
      <div className="-mt-2">
        <Formik
          initialValues={editValues || initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            const { handleSubmit, isValidating, isValid } = formikProps;
      
            return (
              <IonList>
                <TextInput {...formikProps} id="firstName" label="First name" />
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
>>>>>>> 9e8b36b8532e5afc3f720aa2f0426e27de2c6bec
  );
};
