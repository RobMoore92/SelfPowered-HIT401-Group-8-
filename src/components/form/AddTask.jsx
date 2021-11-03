<<<<<<< HEAD
import { IonButton, IonList, useIonToast } from "@ionic/react";
import firebase from "../../firebase/firebase";
import { Formik } from "formik";
import * as yup from "yup";
import TextInput from "../../components/form/TextInput";
import { useAuthState } from "react-firebase-hooks/auth";
import Popover from "../containers/Popover/Popover";
import DateTimeInput from "./DateTimeInput";

import { formatISO, parseISO } from "date-fns";
import { addTask, editTask } from "../../firebase/queries/taskQueries";
import { useEffect, useState } from "react";

export default (props) => {
  const { refresh, setRefresh } = props;
  const [user] = useAuthState(firebase.auth());
  const [present, dismiss] = useIonToast();
  const { editValues, parent, setPopped, mode } = props;
  const formattedJobStart = editValues
    ? new Date(editValues?.job?.start.seconds * 1000)
    : new Date(parent?.start.seconds * 1000);
  const formattedJobDue = editValues
    ? new Date(editValues?.job?.due.seconds * 1000)
    : new Date(parent?.due.seconds * 1000);

  useEffect(() => {
    console.log(parent);
  });
  const initialValues = {
    task: editValues?.task || "",
    start: editValues
      ? new Date(editValues?.start.seconds * 1000)
      : formattedJobStart,
    due: editValues
      ? new Date(editValues?.due.seconds * 1000)
      : formattedJobDue,
  };

  const validationSchema = yup.object().shape({
    task: yup.string().required(),
    start: yup
      .date()
      .min(formattedJobStart, "task start date cannot be before job start date")
      .max(formattedJobDue, "task start date cannot be after job due date"),
    due: yup
      .date()
      .min(yup.ref("start"), "task end date can't be before task start date")
      .max(formattedJobDue, "task due date cannot be after job due date"),
  });

  const onSubmit = (values) => {
    if (mode === "edit") {
      editTask(
        user.uid,
        parent.job_id,
        editValues.task_id,
        values,
        setPopped,
        present,
        dismiss,
        refresh,
        setRefresh
      );
    } else {
      addTask(
        user.uid,
        values,
        parent,
        setPopped,
        present,
        dismiss,
        refresh,
        setRefresh
      );
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
                <TextInput {...formikProps} id="task" label="Task" textarea />
                <DateTimeInput
                  label={"Due date"}
                  error={errors.start}
                  selectedDate={formatISO(values.start)}
                  setSelectedDate={(date) => {
                    setFieldValue("start", parseISO(date));
                  }}
                />
                <DateTimeInput
                  label={"Due date"}
                  error={errors.due}
                  selectedDate={formatISO(values.due)}
                  setSelectedDate={(date) => {
                    setFieldValue("due", parseISO(date));
                  }}
                />
                <IonButton
                  className="w-full mt-4 pr-1"
                  onClick={handleSubmit}
                  disabled={isValidating || !isValid}
                >
                  {editValues ? "Edit Task" : "Add Task"}
                </IonButton>
              </IonList>
            );
          }}
        </Formik>
      </div>
    </Popover>
  );
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

import {formatISO, isAfter, toDate, parseISO} from "date-fns";


export default (props) => {
    const {editValues, setRefresh, refresh, job_id, start, due} = props;

    const formattedDue = new Date(due.seconds * 1000)
    const formattedStart = new Date(start.seconds * 1000)
    const initialValues = {
        task: editValues?.task || "",
        due: formattedDue
    };
    const validationSchema = yup.object().shape({
        task: yup.string().required(),
        due: yup.date().min(
            formattedStart,
            "end date can't be before start date"
        ).max(formattedDue, "cannot be after job due time")
    });

    const history = useHistory();
    const [user] = useAuthState(firebase.auth());

    const onSubmit = (values) => {
        if (editValues) {
            db.collection("users")
                .doc(user.uid)
                .collection("jobs")
                .doc(editValues.id)
                .update({
                    ...values,
                })
                .then(() => {
                    setRefresh(!refresh)
                    props.setPopped(false);
                })
                .catch((e) => console.log(e));
        } else {
            db.collection("users")
                .doc(user.uid)
                .collection("jobs")
                .doc(job_id)
                .collection("tasks")
                .doc()
                .set({
                    ...values
                })
                .then(() => {
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
                    validateOnMount
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
                                <TextInput {...formikProps} id="task" label="Task" textarea/>
                                <DateTimeInput
                                    label={"Due date"}
                                    error={errors.start}
                                    selectedDate={formatISO(values.due)}
                                    setSelectedDate={(date) => {
                                        setFieldValue("due", parseISO(date))
                                    }}
                                />
                                <IonButton
                                    className="w-full mt-4 pr-1"
                                    onClick={handleSubmit}
                                    disabled={isValidating || !isValid}
                                >
                                    {editValues ? "Edit Task" : "Add Task"}
                                </IonButton>
                            </IonList>
                        );
                    }}
                </Formik>
            </div>
        </Popover>
    );
>>>>>>> 9e8b36b8532e5afc3f720aa2f0426e27de2c6bec
};
