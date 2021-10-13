import { IonList, IonFabButton, IonIcon } from "@ionic/react";
import * as icons from "ionicons/icons";

export default ({ values, setFieldValue }) => {
  return (
    <div className="flex flex-wrap justify-evenly justify-start overflow-y-scroll h-96 mt-1">
      {Object.keys(icons)
        .filter((key) => key.includes("Outline"))
        .map((icon) => (
          <IonFabButton
            name="icon"
            color={values?.icon === icon ? "primary" : "contrast"}
            onClick={() => {
              if(values.icon === icon) {
                setFieldValue("icon", "");
              } else {
                setFieldValue("icon", icon);
              }
            }}
            key={icon}
            size="small"
          >
            <IonIcon size="small" icon={icons[icon]} />
          </IonFabButton>
        ))}
    </div>
  );
};
