import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { SplashScreen } from "@capacitor/splash-screen";
import firebase from "./firebase/firebase";
import Home from "./pages/Home";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";

import WelcomePage from "./pages/WelcomePage";

const getData = () => {
  return firebase
    .firestore()
    .collection("users")
    .get()
    .then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      console.log(data); // array of cities objects
    });
};
document.addEventListener("deviceready", () => {
  setTimeout(() => {
    SplashScreen.hide({
      fadeOutDuration: 1000,
    });
  }, 2000);
});
const App = () => (
  <IonApp>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route path="/home" component={WelcomePage} exact={true} />
            <Route path="/" render={() => <Redirect to="/home" />} />
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </IonApp>
);

export default App;
