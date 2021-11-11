import React, { useEffect, useState } from "react";
import Popover from "../PopoverContainer/PopoverContainer";
import { IonProgressBar, IonSpinner, IonText } from "@ionic/react";
import {
  addDocument,
  listDocuments,
} from "../../../firebase/queries/documentQueries";
import DocumentCard from "../../cards/Components/DocumentCard/DocumentCard";
import useIsOnline from "../../hooks/useIsOffline";

const DocumentsPopover = (props) => {
  const { uid, id } = props;
  const isOnline = useIsOnline();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [progress, setProgress] = useState(0);
  const [list, setList] = useState([]);
  useEffect(() => {
    setLoading(true);
    listDocuments(uid, id, setList).then((r) => {
      setList(r);
      setLoading(false);
    });
  }, [refresh]);
  return (
    <Popover {...props}>
      <div data-testid={"documents-popover"} className={"mx-auto"}>
        {loading && (
          <div className={"flex justify-center"}>
            <IonSpinner />
          </div>
        )}
        <div>
          {!loading &&
            isOnline &&
            list.map((item) => {
              return (
                <DocumentCard
                  key={item.fullPath}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  {...item}
                />
              );
            })}
        </div>
        {progress !== 0 && (
          <div className={"mt-2"}>
            <IonText className={"text-sm"}>Uploading</IonText>
            <IonProgressBar className={"mt-2"} buffer={0.5} value={progress} />
          </div>
        )}
        {!isOnline && (
          <IonText>You must be online to upload documents.</IonText>
        )}
        {list.length === 0 && !loading && isOnline && (
          <IonText>No Documents</IonText>
        )}
        <input
          disabled={!isOnline}
          className={"mt-4"}
          type="file"
          onChange={(e) => {
            addDocument(
              uid,
              id,
              e.target.files[0],
              setProgress,
              refresh,
              setRefresh
            );
          }}
        />
      </div>
    </Popover>
  );
};

export default DocumentsPopover;
