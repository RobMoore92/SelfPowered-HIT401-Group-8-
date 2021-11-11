import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  useIonPicker,
  useIonToast,
} from "@ionic/react";
import firebase from "../../../firebase/firebase";
import { Formik } from "formik";
import * as yup from "yup";
import TextInput from "../TextInput/TextInput";
import { useAuthState } from "react-firebase-hooks/auth";
import Popover from "../../popovers/PopoverContainer/PopoverContainer";
import DateTimeInput from "../DateTimeInput/DateTimeInput";
import { useEffect, useState } from "react";
import { addJob, editJob } from "../../../firebase/queries/jobQueries";
import { getClientNames } from "../../../firebase/queries/clientQueries";
import { formatISO, parseISO } from "date-fns";
import useIsOnline from "../../hooks/useIsOffline";

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  start: yup.date(),
  due: yup.date().min(yup.ref("start"), "end date can't be before start date"),
});

export default (props) => {
  const [present, dismiss] = useIonToast();
  const { editValues, clientProp, setPopped } = props;
  const formattedStart = new Date(editValues?.start?.seconds * 1000);
  const formattedDue = new Date(editValues?.due?.seconds * 1000);

  const initialValues = {
    title: editValues?.title || "",
    description: editValues?.description || "",
    start: editValues ? formattedStart : new Date(),
    due: editValues ? formattedDue : new Date(),
  };

  const initialClient = () => {
    if (clientProp) {
      return {
        id: clientProp.client_id,
        name: clientProp.name,
      };
    } else if (editValues) {
      return {
        id: editValues.client_id,
        name: editValues.client_name,
      };
    } else {
      return { name: "No Client", id: null };
    }
  };
  const [user] = useAuthState(firebase.auth());
  const [client, setClient] = useState(initialClient);
  const [clients, setClients] = useState([]);
  const isOnline = useIsOnline();
  useEffect(() => {
    if (user) {
      const unsubscribe = getClientNames(user.uid, setClients);
      return () => unsubscribe();
    }
  }, [user]);

  const onSubmit = (values) => {
    if (editValues) {
      editJob(
        user.uid,
        values,
        editValues,
        client,
        setPopped,
        present,
        dismiss,
        !isOnline
      );
    } else {
      addJob(user.uid, values, client, setPopped, present, dismiss, !isOnline);
    }
  };

  return (
    <Popover {...props}>
      <div className="-mt-2">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => {
            const {
              handleSubmit,
              isValidating,
              setFieldValue,
              values,
              isValid,
              errors,
            } = formikProps;

            return (
              <IonList>
                <TextInput {...formikProps} id="title" label="Title" />
                <TextInput
                  {...formikProps}
                  id="description"
                  label="Description"
                />
                <DateTimeInput
                  label={"Start date"}
                  selectedDate={formatISO(values.start)}
                  setSelectedDate={(date) => {
                    setFieldValue("start", parseISO(date));
                  }}
                />
                <DateTimeInput
                  error={errors.due}
                  label={"Due date"}
                  selectedDate={formatISO(values.due)}
                  setSelectedDate={(date) => {
                    setFieldValue("due", parseISO(date));
                  }}
                />

                {!clientProp && (
                  <ClientPicker
                    clients={clients}
                    client={client}
                    setClient={setClient}
                  />
                )}
                <IonButton
                  className="w-full mt-4 pr-1"
                  onClick={handleSubmit}
                  disabled={isValidating || !isValid}
                >
                  {editValues ? "Edit Job" : "Add Job"}
                </IonButton>
              </IonList>
            );
          }}
        </Formik>
      </div>
    </Popover>
  );
};

const ClientPicker = ({ client, setClient, clients }) => {
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
                  setClient({
                    id: selected.clients.value,
                    name: selected.clients.text,
                  });
                },
              },
            ],
            columns: [
              {
                name: "clients",
                options: [...clients, { text: "No Client", value: null }],
              },
            ],
          })
        }
        data-testid="client-input"
        value={client.name}
        name="client"
        type="client"
      />
    </IonItem>
  );
};
