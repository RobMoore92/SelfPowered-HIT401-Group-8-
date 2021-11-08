import "./TagPopover.css";
import {
  IonButton,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonText,
} from "@ionic/react";
import * as icons from "ionicons/icons";
import {
  add,
  addCircle,
  arrowBack,
  checkmarkOutline,
  trashOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import Popover from "../popovers/PopoverContainer/PopoverContainer";
import IconList from "./IconList";
import { Formik } from "formik";
import * as yup from "yup";
import { db } from "../../firebase/firebase";
import {
  deleteTag,
  getAllTags,
  insertTag,
} from "../../firebase/queries/tagQueries";

export default (props) => {
  const { user, job_id } = props;
  const [tags, setTags] = useState([]);
  const [addTag, setAddTag] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getAllTags(user, setTags);
  }, [addTag, refresh]);
  const initialValues = {
    name: "",
    icon: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    icon: yup.string().required(),
  });
  const onSubmit = (values) => {
    insertTag(user, values, setAddTag);
  };

  return (
    <Popover {...props}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, setFieldValue, handleSubmit }) => {
          return (
            <div>
              <div className="flex justify-between items-center">
                <IonText className="text-2xl font-medium">
                  {addTag ? "Add Tag" : "Tags"}
                </IonText>
                <IonFabButton
                  size="small"
                  color="light"
                  onClick={() => {
                    setAddTag(!addTag);
                  }}
                >
                  <IonIcon
                    size="small"
                    className={`text-3xl text-green-600 z-10`}
                    icon={addTag ? arrowBack : add}
                  />
                </IonFabButton>
              </div>
              {addTag ? (
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <IonItem
                        lines="none"
                        className={"ion-no-padding flex-grow"}
                      >
                        <IonInput
                          name="name"
                          value={values.name}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSubmit();
                            }
                          }}
                          onIonChange={handleChange}
                          placeholder="Tag name"
                        />
                      </IonItem>
                      <div className={"flex flex-col"}>
                        <IonText className={"form-error-text"}>
                          {errors.icon}
                        </IonText>
                        <IonText className={"form-error-text"}>
                          {errors.name}
                        </IonText>
                      </div>
                    </div>
                    <IonFabButton
                      size="small"
                      color="success"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      <IonIcon
                        size="small"
                        className={`text-3xl z-10`}
                        icon={checkmarkOutline}
                      />
                    </IonFabButton>
                  </div>
                  <div className="border-t mb-4 mt-3 bg-blue-500" />
                  <IconList values={values} setFieldValue={setFieldValue} />
                </div>
              ) : (
                <div className="mt-4 h-96 overflow-y-scroll">
                  {tags.map((item, i) => {
                    const { task_id, name, icon } = item;
                    return (
                      <IonItem
                        lines="none"
                        color="light"
                        className={`h-12 w-full rounded`}
                      >
                        <div
                          className={
                            "flex justify-between w-full items-center py-1"
                          }
                        >
                          <div className={"flex items-center"}>
                            <IonIcon
                              className={`text-lg text-blue-500 mx-3`}
                              icon={icons[icon]}
                            />
                            <IonText className="border-none line-clamp-1">
                              {name}
                            </IonText>
                          </div>
                          <div className={"flex space-x-2"}>
                            <IonButton
                              fill={"clear"}
                              size={"small"}
                              className={"ion-no-padding"}
                              onClick={async () => {
                                await db
                                  .collection("users")
                                  .doc(user.uid)
                                  .collection("jobs")
                                  .doc(job_id)
                                  .collection("jobTags")
                                  .add({
                                    ...item,
                                  });
                              }}
                            >
                              <IonIcon
                                className={`text-1xl text-blue-500`}
                                icon={addCircle}
                              />
                            </IonButton>
                            <IonButton
                              fill={"clear"}
                              className={"ion-no-padding z-10"}
                              onClick={() => {
                                deleteTag(user, job_id, task_id).then(() => {
                                  setRefresh(!refresh);
                                });
                              }}
                            >
                              <IonIcon
                                className={`text-1xl text-blue-500`}
                                icon={trashOutline}
                              />
                            </IonButton>
                          </div>
                        </div>
                      </IonItem>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }}
      </Formik>
    </Popover>
  );
};
