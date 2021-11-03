import "./Login.css";
import { Formik } from "formik";
import * as yup from "yup";
import Popover from "../../containers/Popover/Popover";
import firebase from "../../../firebase/firebase";
import { useHistory } from "react-router";

import {
  IonButton,
  IonItem,
  IonInput,
  IonNote,
  useIonToast,
  IonLabel,
  IonIcon,
  IonText,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";

const initialValues = {
  username: "",
  email: "",
  password: "",
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
  },
  [["email", "username"]]
);

export default (props) => {
  const history = useHistory();
  const [present, dismiss] = useIonToast();
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
  const onSubmit = (values, { resetForm }) => {
    const email =
      values.email === "" ? `${values.username}@anonymous.com` : values.email;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, values.password)
      .then(() => {
        props.setPopped(false);
        resetForm({});
        successMessage();
        history.push("/clients");
      })
      .catch((e) => {
        resetForm({});
        errorMessage(e);
      });
  };

  const handleGoogleSubmit = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        props.setPopped(false);
        successMessage();
        history.push("/clients");
      })
      .catch((e) => {
        errorMessage(e);
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
                <div style={{ display: "none" }}>
                  <input
                    type="text"
                    id="PreventChromeAutocomplete"
                    name="PreventChromeAutocomplete"
                    autoComplete="address-level4"
                  />
                </div>
                <IonInput
                  value={values.username}
                  name="username"
                  type="text"
                  onIonChange={handleChange}
                  autocomplete="new-password"
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
                  autocomplete="new-password"
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
                autocomplete="new-password"
                onIonChange={handleChange}
              />
              {errors.password && (
                <IonText className="form-error-text">{errors.password}</IonText>
              )}
            </IonItem>
            <div className="button-container">
              <IonButton
                data-testid="login-button"
                color="primary"
                expand="block"
                disabled={!(isValid && dirty)}
                onClick={handleSubmit}
              >
                Login
              </IonButton>
              <IonButton
                className="google-button"
                data-testid="google-button"
                color="primary"
                expand="block"
                slot="start"
                onClick={handleGoogleSubmit}
              >
                <IonIcon
                  color="light"
                  size="small"
                  slot="start"
                  icon={logoGoogle}
                />
                <span className="google-text"> Sign in with Google</span>
              </IonButton>
            </div>
          </form>
        )}
      </Formik>
    </Popover>
  );
};
