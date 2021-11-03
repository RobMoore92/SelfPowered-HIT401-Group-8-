import "./Sidebar.css";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonListHeader,
  IonMenuToggle,
  IonMenu,
  IonList,
  IonNote,
  IonLabel,
} from "@ionic/react";
import {
  attachOutline,
  briefcaseOutline,
  homeOutline,
  listOutline,
  logoIonic,
  personCircleOutline,
} from "ionicons/icons";
import {
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
} from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import Login from "../auth/Login/Login";
import Signup from "../auth/Signup/Signup";
import firebase, { db } from "../../firebase/firebase";
import SettingsPopover from "../popovers/SettingsPopover";
import { useLocation } from "react-router";
import { getUserData } from "../../firebase/queries/userQueries";
import { GlobalContext } from "../../App";
import AccountPopover from "../popovers/AccountPopover";
export default (props) => {
  const location = useLocation();
  const { user, setHelp, documents, setDocuments } = useContext(GlobalContext);
  const [refresh, setRefresh] = useState(false);
  const [loginPopped, setLoginPopped] = useState(false);
  const [signupPopped, setSignupPopped] = useState(false);
  const [settingsPopped, setSettingsPopped] = useState(false);
  const [accountPopped, setAccountPopped] = useState(false);
  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((snap) => {
        const results = snap.data();
        setHelp(results?.help);
        setDocuments(results?.documents);
        setRefresh(!refresh);
      });
    }
  }, [user, location]);
  const settingPages = [
    {
      title: "Account",
      onClick: () => {
        setAccountPopped(!accountPopped);
      },
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    },
    {
      title: "Settings",
      onClick: () => {
        setSettingsPopped(!settingsPopped);
      },
      iosIcon: paperPlaneOutline,
      mdIcon: paperPlaneSharp,
    },
    {
      title: "About",
      url: "/about",
      iosIcon: heartOutline,
      mdIcon: heartSharp,
    },
    {
      title: "Logout",
      onClick: () => {
        firebase.auth().signOut();
      },
      url: "/welcome",
      iosIcon: heartOutline,
      mdIcon: heartSharp,
    },
  ];
  const unauthPages = [
    {
      title: "Login",
      onClick: () => {
        setLoginPopped(true);
      },
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    },
    {
      title: "Signup",
      onClick: () => {
        setSignupPopped(true);
      },
      iosIcon: paperPlaneOutline,
      mdIcon: paperPlaneSharp,
    },
  ];
  const authPages = [
    {
      title: "Clients",
      url: "/clients",
      iosIcon: personCircleOutline,
      mdIcon: personCircleOutline,
    },
    {
      title: "Jobs",
      url: "/jobs",
      iosIcon: briefcaseOutline,
      mdIcon: briefcaseOutline,
    },
    {
      title: "Tasks",
      url: "/tasks",
      iosIcon: listOutline,
      mdIcon: listOutline,
    },
    {
      disabled: documents,
      title: "Documents",
      url: "/documents",
      iosIcon: attachOutline,
      mdIcon: attachOutline,
    },
  ];
  const displayName = user?.email.replace("@anonymous.com", "");
  console.log(user?.email);
  return (
    <IonMenu data-testid="sidebar" contentId="main" type="overlay">
      <IonContent>
        <div className="sidebar-content">
          <IonList id="inbox-list">
            <IonIcon className="sidebar-icon" size="large" icon={logoIonic} />
            <IonListHeader className="sidebar-title">Application</IonListHeader>
            {user && (
              <IonNote color="light-tint" className="sidebar-note">
                {displayName}
              </IonNote>
            )}
            <div className="sidebar-top-list">
              <Pages pages={user ? authPages : unauthPages} />
            </div>
          </IonList>

          {user && (
            <IonList>
              <IonListHeader>Settings</IonListHeader>
              <div className="sidebar-bottom-list">
                <Pages pages={settingPages} />
              </div>
            </IonList>
          )}
        </div>
      </IonContent>
      <Login isPopped={loginPopped} setPopped={setLoginPopped} />
      <Signup isPopped={signupPopped} setPopped={setSignupPopped} />
      <SettingsPopover
        isPopped={settingsPopped}
        setPopped={setSettingsPopped}
        refresh={refresh}
        setRefresh={setRefresh}
        {...props}
      />
      <AccountPopover
        isPopped={accountPopped}
        setPopped={setAccountPopped}
        refresh={refresh}
        setRefresh={setRefresh}
        {...props}
      />
    </IonMenu>
  );
};

const Pages = ({ pages }) => {
  return pages.map(
    (page, i) =>
      page.disabled !== false && (
        <IonMenuToggle key={i} autoHide={false}>
          <IonItem
            className="ion-padding-horizontal cursor-pointer"
            lines="none"
            routerLink={page.url}
            onClick={page?.onClick}
            routerDirection="none"
            details={false}
          >
            <IonIcon
              alt
              slot="start"
              color="light-tint"
              ios={page.iosIcon}
              md={page.mdIcon}
            />
            <IonLabel>{page.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      )
  );
};
