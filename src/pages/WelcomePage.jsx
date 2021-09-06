import { IonButton, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import Login from "../components/auth/Login/Login";
import Signup from "../components/auth/Signup/Signup";

export default ({ user }) => {
  const [loginPopover, setLoginPopover] = useState(false);
  const [signupPopover, setSignupPopover] = useState(false);
  return (
    <>
      <Login isPopped={loginPopover} setPopped={setLoginPopover} />
      <Signup isPopped={signupPopover} setPopped={setSignupPopover} />
      <div className="flex justify-center items-center h-full">
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
    </>
  );
};
