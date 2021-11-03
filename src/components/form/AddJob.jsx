<<<<<<< HEAD
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  useIonPicker,
  useIonToast,
} from "@ionic/react";
import firebase from "../../firebase/firebase";
import { Formik } from "formik";
import * as yup from "yup";
import TextInput from "../../components/form/TextInput";
import { useAuthState } from "react-firebase-hooks/auth";
import Popover from "../containers/Popover/Popover";
import DateTimeInput from "./DateTimeInput";
import { useEffect, useState } from "react";
import { addJob, editJob } from "../../firebase/queries/jobQueries";
import { getClientNames } from "../../firebase/queries/clientQueries";
import { formatISO, parseISO } from "date-fns";

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  start: yup.date(),
  due: yup.date().min(yup.ref("start"), "end date can't be before start date"),
});

export default (props) => {
  const [present, dismiss] = useIonToast();
  const { editValues, clientProp, isPopped, setPopped } = props;
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
        dismiss
      );
    } else {
      addJob(user.uid, values, client)
        .then(() => {
          setPopped(false);
        })
        .catch((e) => console.log(e));
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

const ClientPicker = ({ client, setClient, errors, clients }) => {
  const [present] = useIonPicker();
  console.log(123);
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
=======
import {IonButton, IonInput, IonItem, IonLabel, IonList, IonText, useIonPicker} from "@ionic/react";
import firebase, {db} from "../../firebase/firebase";
import {Formik} from "formik";
import * as yup from "yup";
import TextInput from "../../components/form/TextInput";
import {useAuthState} from "react-firebase-hooks/auth";
import {useHistory} from "react-router";
import Popover from "../containers/Popover/Popover";
import DateTimeInput from "./DateTimeInput";
import {useEffect, useState} from "react";
import {getAllClients} from "../../firebase/database";
import {formatISO, isAfter, parseISO} from "date-fns";


const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    start: yup.date(),
    due: yup.date().min(
        yup.ref('start'),
        "end date can't be before start date"
    )
});

export default (props) => {
    const {editValues, setRefresh, refresh} = props;
    const formattedStart = new Date(editValues?.start.seconds * 1000);
    const formattedDue = new Date(editValues?.due.seconds * 1000)
    const initialValues = {
        title: editValues?.title || "",
        description: editValues?.description || "",
        start: editValues ? formattedStart : new Date(),
        due: editValues ? formattedDue : new Date(),
    };


    const history = useHistory();
    const [user] = useAuthState(firebase.auth());
    const [client, setClient] = useState(editValues ? {
        id: editValues.client_id,
        name: editValues.client_name
    } : {name: "No Client", id: null})
    const [clients, setClients] = useState([])
    useEffect(() => {
        if (user) {
            getAllClients(user.uid, setClients);
        }
    }, [user]);
    const onSubmit = (values) => {
        if (editValues) {
            db.collection("users")
                .doc(user.uid)
                .collection("jobs")
                .doc(editValues.id)
                .update({
                    ...values, client_id: client.id,
                    client_name: client.name, completed: editValues.completed, title_query: values.title.toLowerCase(),
                })
                .then(() => {
                    setRefresh(!refresh)
                    props.setPopped(false);
                })
                .catch((e) => console.log(e));
        } else {
            console.log(values.title.toLowerCase())
            db.collection("users")
                .doc(user.uid)
                .collection("jobs")
                .doc()
                .set({
                    ...values,
                    important: false,
                    completed: false,
                    dummy: true,
                    title_query: values.title.toLowerCase(),
                    client_id: client.id,
                    client_name: client.name
                })
                .then(() => {
                    history.go(0);
                    props.setPopped(false);
                })
                .catch((e) => console.log(e));
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
                            errors
                        } = formikProps;

                        return (
                            <IonList>
                                <TextInput {...formikProps} id="title" label="Title"/>
                                <TextInput {...formikProps} id="description" label="Description"/>
                                <DateTimeInput
                                    label={"Start date"}
                                    selectedDate={formatISO(values.start)}
                                    setSelectedDate={(date) => {
                                        setFieldValue("start", parseISO(date))
                                    }}
                                />
                                <DateTimeInput
                                    error={errors.due}
                                    label={"Due date"}
                                    selectedDate={formatISO(values.due)}
                                    setSelectedDate={(date) => {
                                        setFieldValue("due", parseISO(date))
                                    }}
                                />

                                <ClientPicker
                                    clients={clients}
                                    client={client}
                                    setClient={setClient}
                                />
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

const ClientPicker = ({client, setClient, errors, clients}) => {
    const [present] = useIonPicker();
    console.log(123)
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
                                    setClient({id: selected.clients.value, name: selected.clients.text})
                                },
                            },
                        ],
                        columns: [
                            {
                                name: "clients",
                                options: [...clients, {text: "No Client", value: null}],
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

>>>>>>> 9e8b36b8532e5afc3f720aa2f0426e27de2c6bec
