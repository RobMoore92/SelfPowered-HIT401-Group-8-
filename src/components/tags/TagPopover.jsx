import "./TagPopover.css";
import {
  IonCard,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
  IonTitle,
} from "@ionic/react";
import {
  add,
  addCircle,
  arrowBack,
  book,
  checkmarkOutline,
  happy,
  warningSharp,
} from "ionicons/icons";
import { useState } from "react";
import Popover from "../containers/Popover/Popover";
import IconList from "./IconList";
import Tag from "./Tag";
import { Formik } from "formik";
import * as yup from "yup";
const tags = [
  {
    id: "1",
    name: "Important",
    icon: warningSharp,
    chipColor: "bg-gray-200",
    iconColor: "text-red-600",
  },
  {
    id: "2",
    name: "Research",
    icon: book,
    chipColor: "bg-gray-200",
    iconColor: "text-blue-500",
  },
  {
    id: "3",
    name: "Important",
    icon: warningSharp,
    chipColor: "bg-gray-200",
    iconColor: "text-red-600",
  },
  {
    id: "4",
    name: "Ressss",
    icon: book,
    chipColor: "bg-gray-200",
    iconColor: "text-blue-500",
  },
  {
    id: "5",
    name: "Re",
    icon: warningSharp,
    chipColor: "bg-gray-200",
    iconColor: "text-red-600",
  },
  {
    id: "6",
    name: "Resssssssssss",
    icon: book,
    chipColor: "bg-gray-200",
    iconColor: "text-blue-500",
  },
  {
    id: "7",
    name: "Important",
    icon: warningSharp,
    chipColor: "bg-gray-200",
    iconColor: "text-red-600",
  },
  {
    id: "8",
    name: "Ress",
    icon: book,
    chipColor: "bg-gray-200",
    iconColor: "text-blue-500",
  },
  {
    id: "9",
    name: "Important",
    icon: warningSharp,
    chipColor: "bg-gray-200",
    iconColor: "text-red-600",
  },
  {
    id: "10",
    name: "Res",
    icon: book,
    chipColor: "bg-gray-200",
    iconColor: "text-blue-500",
  },
];

const initialValues = {
  name: "",
  icon: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  icon: yup.string().required(),
});

const onSubmit = (values) => {
  console.log(values);
};

export default (props) => {
  const [addTag, setAddTag] = useState(false);
  return (
    <Popover {...props}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, setFieldValue, handleSubmit }) => {
          return (
            <div>
              <div className="flex justify-between items-center">
                <IonText className="text-2xl font-medium">{addTag ? "Add Tag" : "Tags"}</IonText>
                <IonFabButton
                  size="small"
                  color="light"
                  onClick={() => {
                    console.log(123);
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
                    <IonFabButton
                      size="small"
                      color="success"
                      onClick={() => {
                        console.log(123);
                        setAddTag(!addTag);
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
                <div className="mt-6 h-96 overflow-y-scroll">
                  {tags.map(({ id, name, icon, iconColor }, i) => {
                    return (
                      <IonItem
                        lines="none"
                        color="light"
                        key={id}
                        className={`h-12 w-full rounded flex items-center py-1 ${
                          i === tags.length - 1 ? "mb-0" : "mb-2"
                        }`}
                      >
                        <IonInput
                          readonly
                          className="border-none"
                          value={name}
                        />
                        <IonIcon
                          className={`text-xl ${iconColor}`}
                          icon={icon}
                        />
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
