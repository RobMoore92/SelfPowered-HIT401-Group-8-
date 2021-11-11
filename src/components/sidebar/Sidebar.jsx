import "./Sidebar.css";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  useIonToast,
} from "@ionic/react";
import {
  attachOutline,
  briefcaseOutline,
  gridOutline,
  informationCircleSharp,
  listOutline,
  logOutSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  personCircleOutline,
  personSharp,
  settingsSharp,
} from "ionicons/icons";
import { useContext, useState } from "react";
import Login from "../auth/Login/Login";
import Signup from "../auth/Signup/Signup";
import SettingsPopover from "../popovers/SettingsPopover";
import { useHistory } from "react-router";
import { logout } from "../../firebase/queries/userQueries";
import { GlobalContext } from "../../App";
import AccountPopover from "../popovers/AccountPopover";
import icon from "../../images/selfpowered-small.svg";

export default () => {
  const history = useHistory();
  const [present, dismiss] = useIonToast();
  const { user, documents } = useContext(GlobalContext);
  const [refresh, setRefresh] = useState(false);
  const [loginPopped, setLoginPopped] = useState(false);
  const [signupPopped, setSignupPopped] = useState(false);
  const [settingsPopped, setSettingsPopped] = useState(false);
  const [accountPopped, setAccountPopped] = useState(false);
  const settingPages = [
    {
      title: "Account",
      onClick: () => {
        setAccountPopped(!accountPopped);
      },
      iosIcon: personSharp,
      mdIcon: personSharp,
    },
    {
      title: "Settings",
      onClick: () => {
        setSettingsPopped(!settingsPopped);
      },
      iosIcon: settingsSharp,
      mdIcon: settingsSharp,
    },
    {
      title: "About",
      url: "/about",
      iosIcon: informationCircleSharp,
      mdIcon: informationCircleSharp,
    },
    {
      title: "Logout",
      onClick: () => logout(present, dismiss, history),
      url: "/welcome",
      iosIcon: logOutSharp,
      mdIcon: logOutSharp,
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
    {
      title: "About",
      url: "/about",
      iosIcon: informationCircleSharp,
      mdIcon: informationCircleSharp,
    },
  ];
  const authPages = [
    {
      title: "Overview",
      url: "/overview",
      iosIcon: gridOutline,
      mdIcon: gridOutline,
    },
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
      title: "All Tasks",
      url: "/tasks",
      iosIcon: listOutline,
      mdIcon: listOutline,
    },
    {
      disabled: documents,
      title: "All Documents",
      url: "/documents",
      iosIcon: attachOutline,
      mdIcon: attachOutline,
    },
  ];
  const displayName = user?.email.replace("@anonymous.com", "");
  return (
    <IonMenu data-testid="sidebar" contentId="main" type="overlay">
      <IonContent>
        <div className="sidebar-content">
          <IonList id="inbox-list">
            <div className={"flex items-center mt-2 mb-4"}>
              <img
                className="w-12 h-12 mx-3 "
                src={icon}
                alt={"selfpowered-icon"}
              />
              <IonListHeader className="sidebar-title font-medium text-3xl tracking-wide">
                <span className={"font-light"}>Self</span> Powered
              </IonListHeader>
            </div>
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
      />
      <AccountPopover
        isPopped={accountPopped}
        setPopped={setAccountPopped}
        refresh={refresh}
        setRefresh={setRefresh}
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
            <IonLabel className={"font-medium"}>{page.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      )
  );
};
