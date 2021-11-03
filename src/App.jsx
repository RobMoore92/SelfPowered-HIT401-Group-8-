import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
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
import { createContext, useContext } from "react";
import Jobs from "./pages/Jobs/Jobs";
import Clients from "./pages/Clients/Clients";
import ClientDetails from "./pages/Clients/ClientDetails";
import JobDetails from "./pages/Jobs/JobDetails";
import Welcome from "./pages/Welcome/Welcome";
import Tasks from "./pages/Tasks/Tasks";
import Documents from "./pages/Documents/Documents";
import { useState } from "react";
import PageNotFound from "./pages/404/404";
import WelcomeHelp from "./components/help/WelcomeHelp";
export const GlobalContext = createContext();
const App = () => {
  const [user, loading] = useAuthState(firebase.auth());
  const [help, setHelp] = useState(false);
  const [documents, setDocuments] = useState(false);
  return (
    !loading && (
      <GlobalContext.Provider
        value={{ user, loading, help, setHelp, documents, setDocuments }}
      >
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Sidebar />
              <IonRouterOutlet id="main">
                <Route
                  component={() => (
                    <PageLayout title={"404"}>
                      <PageNotFound />
                    </PageLayout>
                  )}
                />
                <Route path="/" exact={true}>
                  <Redirect to={user ? "/welcome" : "/welcome"} />
                </Route>
                <Route path="/welcome" exact={true}>
                  <PageLayout title={"Welcome"} helpComponent={WelcomeHelp}>
                    <Welcome user={user} />
                  </PageLayout>
                </Route>
                <Route path="/client" exact={true}>
                  <PageLayout
                    privateRoute
                    payloadTitle
                    showBack
                    showAdd
                    showHelp={help}
                  >
                    <ClientDetails user={user} />
                  </PageLayout>
                </Route>
                <Route path="/tasks" exact={true}>
                  <PageLayout privateRoute title={"Tasks"} showBack>
                    <Tasks />
                  </PageLayout>
                </Route>
                <Route path={"/documents"} exact={true} showHelp={help}>
                  <PageLayout privateRoute title={"Documents"}>
                    <Documents />
                  </PageLayout>
                </Route>
                <Route path="/job" exact={true} showHelp={help}>
                  <PageLayout privateRoute payloadTitle showBack showAdd>
                    <JobDetails />
                  </PageLayout>
                </Route>
                <Route path="/jobs" exact={true} showHelp={help}>
                  <PageLayout privateRoute title={"Jobs"} showBack showAdd>
                    <Jobs />
                  </PageLayout>
                </Route>
                <Route path="/clients" exact={true} showHelp={help}>
                  <PageLayout privateRoute title={"Clients"} showAdd>
                    <Clients />
                  </PageLayout>
                </Route>
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      </GlobalContext.Provider>
    )
  );
};

export default App;
