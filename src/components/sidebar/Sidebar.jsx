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
import { logoIonic } from "ionicons/icons";
import {
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
} from "ionicons/icons";
import { useState } from "react";
import Login from "../auth/Login/Login";
import Signup from "../auth/Signup/Signup";
import firebase from "../../firebase/firebase";

export default ({ user }) => {
  const [loginPopped, setLoginPopped] = useState(false);
  const [signupPopped, setSignupPopped] = useState(false);
  const settingPages = [
    {
      title: "Account",
      url: "/account",
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    },
    {
      title: "Settings",
      url: "/settings",
      iosIcon: paperPlaneOutline,
      mdIcon: paperPlaneSharp,
    },
    {
      title: "About",
      url: "/abouts",
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
      url: "/welcome",
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    },
    {
      title: "Signup",
      url: "/welcome",
      onClick: () => {
        setSignupPopped(true);
      },
      iosIcon: paperPlaneOutline,
      mdIcon: paperPlaneSharp,
    },
  ];
  const authPages = [
    {
      title: "Overview",
      url: "/overview",
      iosIcon: mailOutline,
      mdIcon: mailSharp,
    },
    {
      title: "Clients",
      url: "/clients",
      iosIcon: paperPlaneOutline,
      mdIcon: paperPlaneSharp,
    },
    {
      title: "Jobs",
      url: "/jobs",
      iosIcon: heartOutline,
      mdIcon: heartSharp,
    },
    {
      title: "Tags",
      url: "/tags",
      iosIcon: archiveOutline,
      mdIcon: archiveSharp,
    },
  ];
  const displayName = user?.email.replace("@anonymous.com", "");
  return (
    <IonMenu data-testid="sidebar" contentId="main" type="overlay">
      <IonContent>
        <div className="sidebar-content">
          <IonList id="inbox-list">
            <IonIcon className="sidebar-icon" size="large" icon={logoIonic} />
            <IonListHeader className="sidebar-title">Application</IonListHeader>
            {user && <IonNote color="light-tint" className="sidebar-note">{displayName}</IonNote>}
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
    </IonMenu>
  );
};

const Pages = ({ pages }) => {
  return pages.map((page, i) => (
    <IonMenuToggle key={i} autoHide={false}>
      <IonItem
        lines="none"
        routerLink={page.url}
        onClick={page?.onClick}
        routerDirection="none"
        details={false}
      >
        <IonIcon alt slot="start" color="light-tint" ios={page.iosIcon} md={page.mdIcon} />
        <IonLabel>{page.title}</IonLabel>
      </IonItem>
    </IonMenuToggle>
  ));
};
