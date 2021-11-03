import React, { useState } from "react";
import firebase from "../../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IonCard, IonCardContent, IonText } from "@ionic/react";
import { calendarOutline, hourglassOutline } from "ionicons/icons";
import { isPast } from "date-fns";
import { cardColor } from "../../../helpers/cardColor";
import { formatDateTime } from "../../../helpers/formatHelper";
import Tag from "../../tags/Tag";
import DueIcon from "../../buttons/DueIcon/DueIcon";
import NavigateButton from "../../buttons/NavigateButton/NavigateButton";
import CompletedCheckbox from "../CompletedCheckbox";
import JobSettings from "../Settings/JobSettings";
import Subtitle from "../Subtitle";
import DocumentsButton from "../../buttons/DocumentsButton/DocumentsButton";
import TagsButton from "../../buttons/TagsButton/TagsButton";
import DocumentsPopover from "../../popovers/DocumentsPopover";
import useTimer from "../../hooks/useTimer";

export default (props) => {
  const { item, isPopped, setPopped, parent } = props;
  const {
    client_name,
    job_id,
    start,
    due,
    completed,
    title,
    description,
    tags,
  } = item;
  const startDateTime = new Date(start.seconds * 1000);
  const dueDateTime = new Date(due.seconds * 1000);
  const overdue = isPast(dueDateTime);
  const [user] = useAuthState(firebase.auth());
  const timer = useTimer(dueDateTime, completed);
  const [showDocuments, toggleDocuments] = useState(false);
  return (
    <IonCard>
      <div
        className={`flex w-full justify-between h-16 rounded-t-md ${cardColor(
          completed,
          overdue
        )} items-center p-4`}
      >
        <div className="flex items-center justify-between w-full">
          <div className={"flex items-center space-x-2"}>
            <TagsButton />
            {overdue && !completed && <DueIcon />}
            <DocumentsButton
              showDocuments={showDocuments}
              toggleDocuments={toggleDocuments}
            />
          </div>
          <div className={"flex items-center space-x-2"}>
            <NavigateButton
              pathname={"/job"}
              payload={{ jobDetails: item, title: title }}
            />
            <CompletedCheckbox
              uid={user.uid}
              id={job_id}
              completed={completed}
              {...props}
            />
            <JobSettings
              isPopped={isPopped}
              setPopped={setPopped}
              uid={user?.uid}
              job={item}
            />
          </div>
        </div>
      </div>

      {showDocuments && (
        <DocumentsPopover
          isPopped={showDocuments}
          setPopped={toggleDocuments}
          uid={user.uid}
          id={job_id}
        />
      )}

      <IonCardContent color="light">
        <div className="flex flex-col">
          <div className={"flex space-x-4 -mb-1 md:mb-0"}>
            <div
              className={
                "flex items-center sm:space-x-4 md:space-x-8 justify-between sm:justify-start w-full"
              }
            >
              <Subtitle
                icon={calendarOutline}
                color={"text-green-400"}
                textColor={"text-gray-600"}
                text={formatDateTime(startDateTime)}
              />
              <Subtitle
                icon={calendarOutline}
                color={"text-red-400"}
                textColor={"text-gray-600"}
                text={formatDateTime(dueDateTime)}
              />
            </div>
          </div>
          <Subtitle
            icon={hourglassOutline}
            textColor={"text-gray-700"}
            color={"text-gray-600"}
            text={timer}
          />
          {!parent && (
            <IonText
              className={
                "mt-2 text-xs text-gray-600 font-medium uppercase tracking-widest mb-1"
              }
            >
              {client_name}
            </IonText>
          )}
          <IonText
            className={`text-2xl text-gray-700 font-semibold leading-right ${
              completed && "line-through"
            } line-clamp-1`}
          >
            {title}
          </IonText>
          <IonText className={"text-sm text-gray-600 mt-1 line-clamp-1"}>
            {description}
          </IonText>
        </div>
        {tags && (
          <div className="mt-5">
            {tags.map(({ id, icon, name, chipColor, iconColor }) => {
              return (
                <Tag
                  key={id}
                  icon={icon}
                  name={name}
                  chipColor={chipColor}
                  iconColor={iconColor}
                />
              );
            })}
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};
