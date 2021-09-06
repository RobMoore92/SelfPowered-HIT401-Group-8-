import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonButton, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { SplashScreen } from "@capacitor/splash-screen";
import firebase from "./firebase/firebase";
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
import "./theme/global.css";
import PageLayout from "./layouts/PageLayout/PageLayout";
import Sidebar from "./components/sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import WelcomePage from "./pages/WelcomePage";
import Overview from "./pages/Overview";

const App = () => {
  const [user] = useAuthState(firebase.auth());
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Sidebar user={user} />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/welcome" />
            </Route>
            <Route path="/welcome" exact={true}>
              <PageLayout title={"HIT401"}>
                <WelcomePage user={user} />
              </PageLayout>
            </Route>
            <Route path="/overview" exact={true}>
              <PageLayout title={"Overview"}>
                <Overview />
              </PageLayout>
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
