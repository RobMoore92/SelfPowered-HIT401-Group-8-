import React, { useEffect, useState } from "react";
import firebase from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router";
import { getAllDocuments } from "../../firebase/queries/documentQueries";
import { IonList, IonText } from "@ionic/react";
import DocumentCard from "../../components/cards/DocumentCard";
import NoData from "../../components/cards/NoData";
import PageLayout from "../../layouts/PageLayout/PageLayout";

const Documents = (props) => {
  const [docs, setDocs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [user] = useAuthState(firebase.auth());
  const location = useLocation();
  const uid = user.uid;
  useEffect(() => {
    getAllDocuments(uid, setDocs);
  }, [refresh, location]);
  return (
    <div className={"flex justify-center"}>
      {docs.length === 0 && (
        <NoData
          message={"You have no documents, select a job and attach a document."}
        />
      )}
      {docs.map((item) => {
        return (
          <div className={"mt-4 w-full"}>
            <IonText className={"mt-2 font-medium text-xl"}>
              {item.job_name}
            </IonText>
            <IonList>
              {item.documents.map((item) => {
                return (
                  <DocumentCard
                    key={item.fullPath}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    {...item}
                  />
                );
              })}
            </IonList>
          </div>
        );
      })}
    </div>
  );
};

export default Documents;
