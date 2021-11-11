import { IonButton } from "@ionic/react";
import { useState } from "react";
import Login from "../../components/auth/Login/Login";
import Signup from "../../components/auth/Signup/Signup";
import selfpoweredLogo from "../../images/selfpowered.png";

export default () => {
  const [loginPopover, setLoginPopover] = useState(false);
  const [signupPopover, setSignupPopover] = useState(false);
  return (
    <div className={"flex flex-col justify-center items-center h-full"}>
      <div className={"mb-16 mx-auto"}>
        <img
          alt={"selfpowered logo"}
          src={selfpoweredLogo}
          className={"w-full px-8 mx-auto mb-8"}
        />

        <p className={"text-gray-700 font-bold text-center max-w-md mx-auto"}>
          A time management application focused on freelancers, contractors and
          the self-employed
        </p>

        <Login isPopped={loginPopover} setPopped={setLoginPopover} />
        <Signup isPopped={signupPopover} setPopped={setSignupPopover} />
        <div className="mx-auto justify-center flex space-x-4 mt-8">
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
