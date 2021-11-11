import React, { useEffect, useState } from "react";
import firebase from "../../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IonCard, IonCardContent, IonText } from "@ionic/react";
import { calendarOutline, hourglassOutline } from "ionicons/icons";
import { isPast } from "date-fns";
import { cardColor } from "../../../helpers/cardColor";
import { formatDateTime } from "../../../helpers/formatHelper";
import { getTagsByJob } from "../../../firebase/queries/tagQueries";
import { useHistory, useLocation } from "react-router";
import Tag from "../../tags/Tag";
import NavigateButton from "../../buttons/NavigateButton/NavigateButton";
import CompletedCheckbox from "../Components/CompletedCheckbox/CompletedCheckbox";
import JobSettings from "../Settings/JobSettings/JobSettings";
import Subtitle from "../Components/Subtitle/Subtitle";
import DocumentsButton from "../../buttons/DocumentsButton/DocumentsButton";
import TagsButton from "../../buttons/TagsButton/TagsButton";
import DocumentsPopover from "../../popovers/DocumentsPopover/DocumentsPopover";
import useTimer from "../../hooks/useTimer";
import TagPopover from "../../tags/TagPopover";

export default (props) => {
  const history = useHistory();
  const { item, isPopped, setPopped, parent } = props;
  const { client_name, job_id, start, due, completed, title, description } =
    item;
  const startDateTime = new Date(start.seconds * 1000);
  const dueDateTime = new Date(due.seconds * 1000);
  const overdue = isPast(dueDateTime);
  const location = useLocation();
  const [user] = useAuthState(firebase.auth());
  const timer = useTimer(dueDateTime, completed, item);
  const [showTags, toggleTags] = useState(false);
  const [showDocuments, toggleDocuments] = useState(false);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    if (user) {
      getTagsByJob(user, job_id, setTagList);
    }
  }, [user, location]);

  return (
    <IonCard className={"shadow transition duration-500 hover:shadow-lg mb-4"}>
      <div
        className={`flex w-full justify-between h-16 rounded-t-md ${cardColor(
          completed,
          overdue
        )} items-center p-4`}
      >
        <div className="flex items-center justify-between w-full">
          <div className={"flex items-center space-x-2"}>
            <Subtitle
              icon={hourglassOutline}
              textColor={"text-gray-100"}
              color={"text-gray-100"}
              text={timer}
            />
          </div>
          <div className={"flex items-center space-x-2"}>
            <TagsButton toggleTags={toggleTags} />

            <DocumentsButton
              showDocuments={showDocuments}
              toggleDocuments={toggleDocuments}
            />
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

      {showDocuments && user && (
        <DocumentsPopover
          isPopped={showDocuments}
          setPopped={toggleDocuments}
          uid={user.uid}
          id={job_id}
        />
      )}

      {showTags && user && (
        <TagPopover
          user={user}
          job_id={job_id}
          isPopped={showTags}
          setPopped={toggleTags}
        />
      )}

      <IonCardContent
        color="light"
        className={"cursor-pointer"}
        onClick={() => {
          history.push("/job", { jobDetails: item, title: title });
        }}
      >
        <div className="flex flex-col">
          <div className={"flex space-x-4 -mb-1 md:mb-0"}>
            <div
              className={
                "flex items-center space-x-4 md:space-x-8  sm:justify-start w-full"
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
          <IonText className={"text-sm text-gray-600 mt-1 line-clamp-2"}>
            {description}
          </IonText>
        </div>
        {tagList.length > 0 && (
          <div className="mt-2 flex items-center overflow-x-scroll pb-2">
            {tagList.map((item, i) => {
              return (
                <Tag
                  user={user}
                  job_id={job_id}
                  tag_id={item.tag_id}
                  key={i.toString()}
                  {...item}
                />
              );
            })}
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};
