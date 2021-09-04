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
  IonLabel
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
const unauthPages = [
  {
    title: "Login",
    url: "/overview",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "Signup",
    url: "/clients",
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  }
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
];

export default ({user}) => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonIcon className="sidebar-icon" size="large" icon={logoIonic} />
          <IonListHeader className="sidebar-title">Application</IonListHeader>
          {user && <IonNote className="sidebar-note">{user?.email}</IonNote>}
          <div className="sidebar-top-list">
            <Pages pages={unauthPages} />
          </div>
        </IonList>
       {user && <IonList>
          <IonListHeader>Settings</IonListHeader>
          <div className="sidebar-bottom-list">
            <Pages pages={settingPages} />
          </div>
        </IonList>}
      </IonContent>
    </IonMenu>
  );
};

const Pages = ({ pages }) => {
  return pages.map((page, i) => (
    <IonMenuToggle key={i} autoHide={false}>
      <IonItem lines="none" routerLink={page.url} routerDirection="none" details={false}>
        <IonIcon slot="start" ios={page.iosIcon} md={page.mdIcon} />
        <IonLabel>{page.title}</IonLabel>
      </IonItem>
    </IonMenuToggle>
  ));
};
