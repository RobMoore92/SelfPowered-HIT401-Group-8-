import { IonIcon } from "@ionic/react";
import { chevronForwardCircle } from "ionicons/icons";
import Tag from "./Tag";

export default ({ tags }) => {
  return (
    <div>
      <div className="flex items-center">
        {tags?.map(({ id, icon, name, chipColor, iconColor }) => {
          return (
            <Tag
              key={id}
              icon={icon}
              name={name}
              chipColor={chipColor}
              iconColor={iconColor}
            />
          );
        })}
        <IonIcon size="small" icon={chevronForwardCircle} />
      </div>
    </div>
  );
};
