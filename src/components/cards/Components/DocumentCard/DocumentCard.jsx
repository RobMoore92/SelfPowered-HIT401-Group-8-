import React from "react";
import { IonIcon, IonText } from "@ionic/react";
import {
  documentTextOutline,
  image,
  musicalNotesOutline,
} from "ionicons/icons";
import DeleteDocumentButton from "../../../buttons/DeleteDocumentButton/DeleteDocumentButton";
import DownloadDocumentButton from "../../../buttons/DownloadDocumentButton/DownloadDocumentButton";

const DocumentCard = (props) => {
  const { name, contentType } = props;
  const icon = () => {
    if (contentType.includes("image")) {
      return image;
    }
    if (contentType.includes("audio")) {
      return musicalNotesOutline;
    } else {
      return documentTextOutline;
    }
  };
  return (
    <div data-testid="document-card" className={"bg-blue-500 px-3"}>
      <div className={"flex items-center justify-between w-full"}>
        <div className={"flex items-center "}>
          <IonIcon className={"mr-2 text-2xl text-white"} icon={icon()} />
          <IonText className={"line-clamp-1 w-full text-white"}>{name}</IonText>
        </div>
        <div className={"flex items-center"}>
          <DownloadDocumentButton {...props} />
          <DeleteDocumentButton {...props} />
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
