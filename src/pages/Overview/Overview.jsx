import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/firebase";
import { IonIcon, useIonToast } from "@ionic/react";
import { Link } from "react-router-dom";
import {
  attachOutline,
  briefcaseOutline,
  informationSharp,
  listOutline,
  logInSharp,
  logOutSharp,
  personCircleOutline,
  personSharp,
  settingsSharp,
} from "ionicons/icons";
import Login from "../../components/auth/Login/Login";
import SettingsPopover from "../../components/popovers/SettingsPopover";
import AccountPopover from "../../components/popovers/AccountPopover";
import { logout } from "../../firebase/queries/userQueries";
import { useHistory } from "react-router";

const Overview = () => {
  const history = useHistory();
  const [user] = useAuthState(firebase.auth());
  const [present, dismiss] = useIonToast();
  const [lastLogged, setLastLogged] = useState();
  const [displayName, setDisplayName] = useState();
  const [refresh, setRefresh] = useState(false);
  const [loginPopped, setLoginPopped] = useState(false);
  const [settingsPopped, setSettingsPopped] = useState(false);
  const [accountPopped, setAccountPopped] = useState(false);

  const cards = [
    {
      id: 1,
      title: "Clients",
      color: "from-green-400 to-green-500",
      icon: personCircleOutline,
      link: "/clients",
    },
    {
      id: 2,
      title: "Jobs",
      color: "from-green-400 to-green-500",
      icon: briefcaseOutline,
      link: "/jobs",
    },
    {
      id: 3,
      title: "Tasks",
      color: "from-green-400 to-green-500",
      icon: listOutline,
      link: "/tasks",
    },
    {
      id: 4,
      title: "Documents",
      color: "from-green-400 to-green-500",
      icon: attachOutline,
      link: "/documents",
    },
    {
      id: 5,
      title: "Account",
      color: "from-red-400 to-red-500",
      icon: personSharp,
      link: "/overview",
      onClick: () => setAccountPopped(true),
    },
    {
      id: 6,
      title: "About",
      color: "from-blue-400 to-blue-500",
      icon: informationSharp,
      link: "/about",
    },
    {
      id: 7,
      title: "Settings",
      color: "from-red-400 to-red-500",
      icon: settingsSharp,
      link: "/overview",
      onClick: () => setSettingsPopped(true),
    },
    {
      id: 8,
      title: "Login",
      color: "from-blue-400 to-blue-500",
      icon: logInSharp,
      link: "/overview",
      onClick: () => setLoginPopped(true),
    },
    {
      id: 9,
      title: "Logout",
      color: "from-blue-400 to-blue-500",
      icon: logOutSharp,
      link: "/welcome",
      onClick: () => logout(present, dismiss, history),
    },
  ];

  useEffect(() => {
    if (user) {
      setLastLogged(user.metadata.lastSignInTime);
      setDisplayName(user.email.replace("@anonymous.com", ""));
    }
  }, [user]);
  return (
    <div
      className={
        " flex flex-col justify-center items-center pt-8 md:pt-24 lg:pt-32"
      }
    >
      {lastLogged && (
        <>
          <p
            className={"text-2xl font-medium mb-4"}
          >{`Welcome back ${displayName}!`}</p>{" "}
          <p
            className={"text-center max-w-xs sm:max-w-none "}
          >{`You were last logged in at ${lastLogged}`}</p>
        </>
      )}
      <div
        className={
          "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-8 my-8 max-w-3xl"
        }
      >
        {cards.map((item) => (
          <Card key={item.id.toString()} {...item} />
        ))}
      </div>
      <Login isPopped={loginPopped} setPopped={setLoginPopped} />
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
    </div>
  );
};

export default Overview;

const Card = ({ title, color, icon, link, onClick }) => {
  return (
    <Link to={link}>
      <button
        onClick={onClick}
        className={`h-32 w-32 sm:h-40 sm:w-40 rounded shadow hover:shadow-lg transition duration-300 transform hover:scale-110 bg-gradient-to-br ${color} flex flex-col justify-center items-center focus:outline-none`}
      >
        <IonIcon className={"text-white text-xl mb-1"} icon={icon} />
        <p className={"text-xl font-medium text-gray-100"}>{title}</p>
      </button>
    </Link>
  );
};
