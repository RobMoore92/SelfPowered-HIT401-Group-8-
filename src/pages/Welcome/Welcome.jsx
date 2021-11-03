import { IonButton } from "@ionic/react";
import { useState } from "react";
import Login from "../../components/auth/Login/Login";
import Signup from "../../components/auth/Signup/Signup";
import WelcomeHelp from "../../components/help/WelcomeHelp";
import selfpoweredLogo from "../../images/selfpowered.png";
export default ({ user, token, showHelp, setShowHelp }) => {
  const [loginPopover, setLoginPopover] = useState(false);
  const [signupPopover, setSignupPopover] = useState(false);
  return (
    <div className={"flex flex-col justify-center items-center h-full"}>
      <div className={"mb-16 mx-auto"}>
        <img alt={""} src={selfpoweredLogo} className={"w-full px-8 mx-auto"} />
        <Login isPopped={loginPopover} setPopped={setLoginPopover} />
        <Signup isPopped={signupPopover} setPopped={setSignupPopover} />
        <WelcomeHelp isPopped={showHelp} setPopped={setShowHelp} />
        <div className="mx-auto justify-center flex space-x-4 mt-16">
          <IonButton
            className="auth-button"
            onClick={() => {
              setLoginPopover(!loginPopover);
            }}
          >
            Login
          </IonButton>
          <IonButton
            className="auth-button"
            onClick={() => {
              setSignupPopover(!signupPopover);
            }}
          >
            Signup
          </IonButton>
        </div>
      </div>
    </div>
  );
};
