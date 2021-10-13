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
};
