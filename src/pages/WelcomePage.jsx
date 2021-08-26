import firebase from "firebase";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { login, signUpWithEmail } from "../firebase/auth";

const WelcomePage = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  useEffect(() => {
      console.log(user?.email, 'user')
  }, [user])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">123</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="flex justify-center">
          <Login />
        </div>
        <div className="flex justify-center mt-16">
          <SignUpWithEmail />
        </div>
        <IonText className={"text-2xl text-white"}>{user?.email}</IonText>
        <IonText className={"text-2xl text-white"}>{loading}</IonText>
      </IonContent>
    </IonPage>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <IonList className="w-1/2 p-8">
      <IonText className="text-3xl ml-4">Login</IonText>
      <IonItem className="mt-8">
        <IonInput
          value={email}
          placeholder="Email"
          clearInput
          onIonChange={(e) => setEmail(e.detail.value)}
        />
      </IonItem>
      <IonItem className="mb-8 mt-4">
        <IonInput
          value={password}
          placeholder="Password"
          onIonChange={(e) => setPassword(e.detail.value)}
          clearInput
          type="password"
        />
      </IonItem>
      <IonButton onClick={() => login(email, password)} expand="full">
        Login
      </IonButton>
    </IonList>
  );
};

const SignUpWithEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <IonList className="w-1/2 p-8">
      <IonText className="text-3xl ml-4">Sign Up</IonText>
      <IonItem className="mt-8">
        <IonInput
          value={email}
          placeholder="Email"
          clearInput
          onIonChange={(e) => setEmail(e.detail.value)}
        />
      </IonItem>
      <IonItem className="mb-8 mt-4">
        <IonInput
          value={password}
          placeholder="Password"
          onIonChange={(e) => setPassword(e.detail.value)}
          clearInput
          type="password"
        />
      </IonItem>
      <IonButton onClick={() => signUpWithEmail(email, password)} expand="full">
        Sign up
      </IonButton>
    </IonList>
  );
};

export default WelcomePage;
