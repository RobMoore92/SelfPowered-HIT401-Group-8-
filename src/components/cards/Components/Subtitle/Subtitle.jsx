import { IonButton, IonIcon, IonText } from "@ionic/react";
import { useState } from "react";
import { closeCircle } from "ionicons/icons";

const Subtitle = (props) => {
  const { icon, text, color, textColor, hasHover } = props;
  const [hover, setHover] = useState(false);
  return (
    <div className="flex items-center">
      <IonButton
        className="ion-no-padding ion-no-margin focus:text-white"
        fill={"clear"}
        onClick={() => setHover(!hover)}
      >
        <IonIcon
          className={`ion-no-padding ion-no-margin ${
            color ? color : "text-gray-100"
          } text-lg md:text-2xl mr-1 md:mr-3`}
          icon={icon}
        />
        <div className={`${hasHover ? "hidden xl:block" : "block"}`}>
          <IonText
            className={` ion-no-padding  ${
              textColor ? textColor : "text-gray-600"
            } text-xs sm:text-sm text-gray-100 font-medium line-clamp-1 normal-case hidden`}
          >
            {text}
          </IonText>
        </div>
      </IonButton>
      {hover && hasHover && (
        <HoverCard {...props} hover={hover} setHover={setHover} />
      )}
    </div>
  );
};

const HoverCard = ({ text, icon, color, setHover, hover }) => {
  return (
    <div className={"absolute shadow-lg rounded z-20 bg-gray-100 px-2"}>
      <div className={"flex items-center justify-center"}>
        <IonButton
          className="ion-no-padding"
          fill={"clear"}
          onClick={() => setHover(!hover)}
        >
          <IonIcon
            className={` ${
              color ? color : "text-gray-600"
            } pt-0 pb-0 text-2xl mr-2`}
            icon={icon}
          />
        </IonButton>
        <IonText
          className={`
            text-gray-600 text-sm mr-2 text-gray-100 font-medium`}
        >
          {text}
        </IonText>
        <IonButton
          className="ion-no-padding"
          fill={"clear"}
          onClick={() => setHover(!hover)}
        >
          <IonIcon className={`text-gray-600 text-xl`} icon={closeCircle} />
        </IonButton>
      </div>
    </div>
  );
};

export default Subtitle;
