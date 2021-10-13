import { Redirect, Route, useHistory } from "react-router-dom";
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
import Overview from "./pages/Overview/Overview";
import Jobs from "./pages/Jobs/Jobs";
import AddJob from "./pages/Jobs/AddJob";
import Welcome from "./pages/Welcome/Welcome";
import Clients from "./pages/Clients/Clients";
import { useEffect } from "react";
import ClientDetails from "./pages/Clients/ClientDetails";
import JobDetails from "./pages/Jobs/JobDetails";
const App = () => {
  const history = useHistory();
  const [user, loading] = useAuthState(firebase.auth());
  return (
    !loading && (
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Sidebar user={user} />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to={user ? "/overview" : "/welcome"} />
              </Route>
              <Route path="/welcome" exact={true}>
                <PageLayout title={"HIT401"}>
                  <Welcome user={user} />
                </PageLayout>
              </Route>
              <Route path="/overview" exact={true}>
                <PageLayout title={"Overview"}>
                  <Overview />
                </PageLayout>
              </Route>
              <Route path="/client" exact={true}>
                <PageLayout>
                  <ClientDetails/>
                </PageLayout>
              </Route>
              <Route path="/job" exact={true}>
                <PageLayout>
                  <JobDetails/>
                </PageLayout>
              </Route>
              <Route path="/jobs" exact={true}>
                <PageLayout title={"Jobs"}>
                  <Jobs />
                </PageLayout>
              </Route>
              <Route path="/add-job" exact={true}>
                <PageLayout title={"Add Job"}>
                  <AddJob />
                </PageLayout>
              </Route>
              <Route path="/clients" exact={true}>
                <PageLayout title={"Clients"}>
                  <Clients />
                </PageLayout>
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    )
  );
};

export default App;
