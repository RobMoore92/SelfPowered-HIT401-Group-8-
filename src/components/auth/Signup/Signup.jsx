import "./Signup.css";
import { Formik } from "formik";
import * as yup from "yup";
import Popover from "../../containers/Popover/Popover";
import firebase, { db } from "../../../firebase/firebase";
import { useHistory } from "react-router";

import {
  IonButton,
  IonItem,
  IonInput,
  IonNote,
  useIonToast,
  IonLabel,
  IonText,
} from "@ionic/react";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirm: "",
};

const validationSchema = yup.object().shape(
  {
    email: yup
      .string()
      .email()
      .when("username", {
        is: (username) => !username || username.length === 0,
        then: yup
          .string()
          .email()
          .required("either username or email is required"),
        otherwise: yup.string(),
      }),
    username: yup.string().when("email", {
      is: (email) => !email || email.length === 0,
      then: yup.string().required("either email or username is required"),
      otherwise: yup.string(),
    }),
    password: yup.string().required().min(8).max(32),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  },
  [["email", "username"]]
);

export default (props) => {
  const history = useHistory();
  const [present, dismiss] = useIonToast();
  const onSubmit = (values, { resetForm }) => {
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
            props.setPopped(false);
            resetForm({});
            present({
              color: "success",
              buttons: [{ text: "hide", handler: () => dismiss() }],
              message: "You have successfully logged in",
              duration: 5000,
            });
            history.push("/clients");
          });
      })
      .catch((e) => {
        resetForm({});
        present({
          color: "danger",
          buttons: [{ text: "hide", handler: () => dismiss() }],
          message: e.message,
          duration: 5000,
        });
      });
  };
  return (
    <Popover {...props}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleSubmit, isValid, dirty, values, errors }) => (
          <form autoComplete="off">
            {!values.email && (
              <IonItem>
                <IonLabel for="username" position="stacked">
                  Username
                </IonLabel>
                <IonInput
                  data-testid="username-input"
                  value={values.username}
                  name="username"
                  type="text"
                  onIonChange={handleChange}
                />
                {errors.username && (
                  <IonText className="form-error-text">
                    {errors.username}
                  </IonText>
                )}
              </IonItem>
            )}
            {!values.username && (
              <IonItem>
                <IonLabel for="email" position="stacked">
                  Email address
                </IonLabel>
                <IonInput
                  data-testid="email-input"
                  value={values.email}
                  name="email"
                  type="email"
                  onIonChange={handleChange}
                />
                {errors.email && (
                  <IonText className="form-error-text">{errors.email}</IonText>
                )}
              </IonItem>
            )}
            <IonItem>
              <IonLabel for="password" position="stacked">
                Password
              </IonLabel>
              <IonInput
                data-testid="password-input"
                value={values.password}
                name="password"
                type="password"
                onIonChange={handleChange}
              />
              {errors.password && (
                <IonText className="form-error-text">{errors.password}</IonText>
              )}
            </IonItem>
            <IonItem>
              <IonLabel for="password" position="stacked">
                Confirm password
              </IonLabel>
              <IonInput
                data-testid="confirm-input"
                value={values.confirm}
                name="confirm"
                type="password"
                onIonChange={handleChange}
              />
              {errors.confirm && (
                <IonText className="form-error-text">{errors.confirm}</IonText>
              )}
            </IonItem>
            <div className="button-container">
              <IonButton
                disabled={!(isValid && dirty)}
                data-testid="signup-button"
                color="primary"
                expand="block"
                onClick={handleSubmit}
              >
                Signup
              </IonButton>
            </div>
          </form>
        )}
      </Formik>
    </Popover>
  );
};
