import { IonPopover } from "@ionic/react";
import "./Popover.css"

export default ({ isPopped, setPopped, children }) => {
  const didDismiss = () => {setPopped(false)};
  return (
    <IonPopover data-testid="popover" className="popover-container" event={"undefined"} isOpen={isPopped} onDidDismiss={didDismiss}>
      {children}
    </IonPopover>
  );
};
