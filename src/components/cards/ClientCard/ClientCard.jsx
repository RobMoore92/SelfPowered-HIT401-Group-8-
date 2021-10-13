import "./ClientCard.css"
import {
    IonCard,
    IonIcon,
    IonText,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonToggle,
    useIonAlert,
} from "@ionic/react";
import {
    arrowForwardCircleOutline,
    atCircleOutline,
    briefcaseOutline,
    callOutline,
    ellipsisVertical, enterOutline,
    personCircleOutline,
    star,
} from "ionicons/icons";
import {useState} from "react";
import Popover from "../../containers/Popover/Popover";
import firebase, {auth, db} from "../../../firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import AddClient from "../../form/AddClient";
import {
    deleteClient,
    updateClient,
    updateClientActive,
    updateClientImportant,
} from "../../../firebase/database";
import {useHistory} from "react-router-dom";

export default (props) => {
    const {id, firstName, lastName, company, phone, email, important, active} =
        props;
    const [user] = useAuthState(auth);
    const history = useHistory();
    return (
        <IonItem className="ion-no-margin">
            <IonCard className="w-full ion-no-padding">
                <div
                    className={`flex w-full justify-between h-16 rounded-t-md ${
                        active ? "bg-blue-500" : "bg-gray-500"
                    } items-center p-4`}
                >
                    <div className="flex">
                        <div className="flex items-center">
                            <IonIcon
                                color="light"
                                className="text-2xl mr-2"
                                icon={personCircleOutline}
                            />
                            <IonText className="text-sm mr-6 text-gray-100">{`${firstName} ${lastName}`}</IonText>
                        </div>
                        <div className="flex items-center">
                            <IonIcon
                                color="light"
                                className="text-2xl mr-2"
                                icon={briefcaseOutline}
                            />
                            <IonText className="text-sm mr-6 text-gray-100">{`${company}`}</IonText>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <IonButton
                            className="ion-no-padding"
                            fill="clear"
                            onClick={() => {
                                history.push({pathname: "/client", state: {"clientDetails": {...props}}});
                            }}
                        >
                            <IonIcon
                                className={`text-2xl text-gray-100`}
                                icon={arrowForwardCircleOutline}
                            />
                        </IonButton>
                        <IonButton
                            className="ion-no-padding"
                            fill="clear"
                            onClick={() => {
                                updateClientImportant(user.uid, id, !important)
                            }}
                        >
                            <IonIcon
                                className={`text-xl ${
                                    important ? "text-yellow-400" : "text-gray-100"
                                }`}
                                icon={star}
                            />
                        </IonButton>
                        <SettingsPopover {...props} uid={user.uid}/>
                    </div>
                </div>

                <IonCardContent color="light">
                    <div className="flex items-center mb-3">
                        <IonIcon
                            color="primary"
                            className="text-xl mr-4"
                            icon={callOutline}
                        />
                        <IonText className="text-sm mr-6">{phone}</IonText>
                    </div>
                    <div className="flex items-center">
                        <IonIcon
                            color="primary"
                            className="text-2xl mr-3"
                            icon={atCircleOutline}
                        />
                        <IonText className="text-sm mr-6">{email}</IonText>
                    </div>
                </IonCardContent>
            </IonCard>
        </IonItem>
    );
};

const SettingsPopover = (props) => {
    const {uid} = props;
    const [settingsPopped, setSettingsPopped] = useState(false);
    const [editPopped, setEditPopped] = useState(false);
    const [present] = useIonAlert();
    const showSettings = () => setSettingsPopped(true);
    const showEdit = () => {
        setSettingsPopped(false);
        setEditPopped(true);
    };
    const {id, firstName, lastName, company, phone, email, important, active} =
        props;
    return (
        <>
            <IonButton className="ion-no-padding" fill="clear" onClick={showSettings}>
                <IonIcon
                    slot="end"
                    color="light"
                    className="text-xl ml-0 pl-0"
                    icon={ellipsisVertical}
                />
            </IonButton>
            <Popover isPopped={settingsPopped} setPopped={setSettingsPopped}>
                <div className="flex justify-between items-center">
                    <IonLabel>Active</IonLabel>
                    <IonToggle
                        checked={active}
                        onIonChange={() => {
                            updateClientActive(uid, id, !active);
                        }}
                    />
                </div>
                <IonButton
                    onClick={showEdit}
                    className="mt-4"
                    color="warning"
                    expand="full"
                >
                    Edit Client
                </IonButton>
                <IonButton
                    onClick={() => {
                        setSettingsPopped(false);
                        present({
                            cssClass: "my-css",
                            header: "Warning",
                            message: `Are you sure you want to delete this client?`,
                            buttons: [
                                "Cancel",
                                {
                                    text: "Yes",
                                    handler: () => deleteClient(uid, id),
                                },
                            ],
                        });
                    }}
                    className="mt-4"
                    color="danger"
                    expand="full"
                >
                    Delete Client
                </IonButton>
            </Popover>
            <AddClient
                isPopped={editPopped}
                setPopped={setEditPopped}
                editValues={{
                    id,
                    firstName,
                    lastName,
                    company,
                    phone,
                    email,
                    important,
                }}
            />
        </>
    );
};
