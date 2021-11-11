import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  useIonToast,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import firebase from "./firebase/firebase";
//ionic imports
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
//styles
import "./theme/variables.css";
import "./theme/global.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { createContext, useEffect, useState } from "react";
import PageLayout from "./layouts/PageLayout/PageLayout";
import Sidebar from "./components/sidebar/Sidebar";
import Jobs from "./pages/Jobs/Jobs";
import Clients from "./pages/Clients/Clients";
import ClientDetails from "./pages/Clients/ClientDetails";
import JobDetails from "./pages/Jobs/JobDetails";
import Welcome from "./pages/Welcome/Welcome";
import Tasks from "./pages/Tasks/Tasks";
import Documents from "./pages/Documents/Documents";
import PageNotFound from "./pages/404/404";

import { useTaskAlert } from "./components/hooks/useTaskAlert";
import useIsOnline from "./components/hooks/useIsOffline";
import About from "./pages/About/About";
import Overview from "./pages/Overview/Overview";
import { getUserData } from "./firebase/queries/userQueries";

export const GlobalContext = createContext(undefined);

const App = () => {
  const [present, dismiss] = useIonToast();
  const [user, loading] = useAuthState(firebase.auth());
  const [help, setHelp] = useState(true);
  const [documents, setDocuments] = useState(true);
  const isOnline = useIsOnline();
  useTaskAlert(present, dismiss);
  useEffect(() => {
    if (user) {
      getUserData(user.uid, setHelp, setDocuments);
    }
  }, [user]);
  return (
    !loading && (
      <GlobalContext.Provider
        value={{
          user,
          loading,
          help,
          setHelp,
          documents,
          setDocuments,
          isOnline,
        }}
      >
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Sidebar />
              <IonRouterOutlet id="main">
                <Route
                  component={() => (
                    <PageLayout showBack title={"404"}>
                      <PageNotFound />
                    </PageLayout>
                  )}
                />
                <Route path="/" exact={true}>
                  <Redirect to={user ? "/overview" : "/welcome"} />
                </Route>
                <Route path="/welcome" exact={true}>
                  <PageLayout>
                    <Welcome />
                  </PageLayout>
                </Route>
                <Route path="/overview" exact={true}>
                  <PageLayout showBack privateRoute title={"Overview"}>
                    <Overview />
                  </PageLayout>
                </Route>
                <Route path="/about" exact={true}>
                  <PageLayout showBack>
                    <About />
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
                  <PageLayout
                    privateRoute
                    title={"Tasks"}
                    showBack
                    showHelp={help}
                  >
                    <Tasks />
                  </PageLayout>
                </Route>
                <Route
                  path={"/documents"}
                  exact={true}
                  showBack
                  showHelp={help}
                >
                  <PageLayout
                    privateRoute
                    title={"Documents"}
                    showBack
                    showHelp={help}
                  >
                    <Documents />
                  </PageLayout>
                </Route>
                <Route path="/job" exact={true}>
                  <PageLayout
                    privateRoute
                    payloadTitle
                    showHelp={help}
                    showBack
                    showAdd
                  >
                    <JobDetails />
                  </PageLayout>
                </Route>
                <Route path="/jobs" exact={true}>
                  <PageLayout
                    showHelp={help}
                    privateRoute
                    title={"Jobs"}
                    showBack
                    showAdd
                  >
                    <Jobs />
                  </PageLayout>
                </Route>
                <Route path="/clients" exact={true} showHelp={help}>
                  <PageLayout
                    privateRoute
                    title={"Clients"}
                    showHelp={help}
                    showBack
                    showAdd
                  >
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
