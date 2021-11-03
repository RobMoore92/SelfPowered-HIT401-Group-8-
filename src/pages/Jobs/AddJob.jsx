import {
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  useIonToast,
  IonContent,
  useIonPicker,
} from "@ionic/react";
import { Formik } from "formik";
import { useHistory } from "react-router";
import firebase, {auth} from "../../firebase/firebase";
import * as yup from "yup";
import { useEffect, useState } from "react";
import DateTimeInput from "../../components/form/DateTimeInput";
import format from "date-fns/format";
import { formatISO } from "date-fns";
import {getAllClient} from "../../firebase/database";
import {useAuthState} from "react-firebase-hooks/auth";
export default (props) => {
  const [user, loading] = useAuthState(auth);
  const [clients, setClients] = useState([]);
  const history = useHistory();
  const [present, dismiss] = useIonToast();

  useEffect(() => {

  }, [loading])

  const initialValues = {
    username: "",
    email: "",
    start: formatISO(new Date()),
    due: formatISO(new Date()),
  };
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
  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),

  });

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
        history.push("/overview");
      })
      .catch((e) => {
        resetForm({});
        errorMessage(e);
      });
  };
  return (
    <div className="p-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          isValid,
          dirty,
          values,
          errors,
        }) => (
          <>
            <IonItem>
              <IonLabel for="title" position="stacked">
                Title
              </IonLabel>
              <IonInput
                data-testid="title-input"
                value={values.title}
                name="title"
                type="text"
                onIonChange={handleChange}
              />
              {errors.username && (
                <IonText className="form-error-text">{errors.username}</IonText>
              )}
            </IonItem>
            <IonItem>
              <IonLabel for="description" position="stacked">
                Description
              </IonLabel>
              <IonInput
                data-testid="description-input"
                value={values.description}
                name="description"
                type="description"
                onIonChange={handleChange}
              />
              {errors.email && (
                <IonText className="form-error-text">{errors.email}</IonText>
              )}
            </IonItem>

            <DateTimeInput
              label={"Start date"}
              selectedDate={values.start}
              setSelectedDate={(date) => setFieldValue("start", date)}
            />
            <DateTimeInput
              label={"Due date"}
              selectedDate={values.due}
              setSelectedDate={(date) => setFieldValue("due", date)}
            />
            <ClientPicker
                clients={clients}
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              errors={errors}
            />
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
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

const ClientPicker = ({ clients, values, handleChange, setFieldValue, errors }) => {
  const [present] = useIonPicker();
  return (
    <IonItem>
      <IonLabel for="description" position="stacked">
        Client
      </IonLabel>
      <IonInput
        onClick={() =>
          present({
            buttons: [
              {
                text: "Confirm",
                handler: (selected) => {
                  setFieldValue("client", selected.clients.text)
                },
              },
            ],
            columns: [
              {
                name: "clients",
                options: clients,
              },
            ],
          })
        }
        data-testid="client-input"
        value={values.client}
        name="client"
        type="client"
        onIonChange={handleChange}
      />
      {errors.email && (
        <IonText className="form-error-text">{errors.email}</IonText>
      )}
    </IonItem>
  );
};
