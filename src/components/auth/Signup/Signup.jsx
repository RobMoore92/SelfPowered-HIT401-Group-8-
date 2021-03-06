import "./Signup.css";
import { Formik } from "formik";
import * as yup from "yup";
import Popover from "../../popovers/PopoverContainer/PopoverContainer";
import { useHistory } from "react-router";
import firebase from "../../../firebase/firebase";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  useIonToast,
} from "@ionic/react";
import { signUp } from "../../../firebase/queries/userQueries";
import { useAuthState } from "react-firebase-hooks/auth";

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
  const [user] = useAuthState(firebase.auth());
  const [present, dismiss] = useIonToast();
  const onSubmit = (values, { resetForm }) => {
    signUp(user, values, resetForm, present, dismiss, props.setPopped, history);
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
