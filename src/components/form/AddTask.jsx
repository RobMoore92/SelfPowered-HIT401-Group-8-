import { IonButton, IonList, useIonToast } from "@ionic/react";
import firebase from "../../firebase/firebase";
import { Formik } from "formik";
import * as yup from "yup";
import TextInput from "../../components/form/TextInput";
import { useAuthState } from "react-firebase-hooks/auth";
import Popover from "../popovers/PopoverContainer/PopoverContainer";
import DateTimeInput from "./DateTimeInput";

import { formatISO, parseISO } from "date-fns";
import { addTask, editTask } from "../../firebase/queries/taskQueries";

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
      .min(
        formattedJobStart,
        "task start date cannot be before job start date"
      ),
    due: yup
      .date()
      .min(yup.ref("start"), "task end date can't be before task start date"),
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
};
