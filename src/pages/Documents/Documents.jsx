import React, { useEffect, useState } from "react";
import firebase from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router";
import { getAllDocuments } from "../../firebase/queries/documentQueries";
import { IonList } from "@ionic/react";
import DocumentCard from "../../components/cards/DocumentCard";
import NoData from "../../components/cards/NoData";
import useIsOnline from "../../components/hooks/useIsOffline";

const Documents = (props) => {
  const [docs, setDocs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [user] = useAuthState(firebase.auth());
  const location = useLocation();
  const isOnline = useIsOnline();
  const uid = user?.uid;
  useEffect(() => {
    if (isOnline) {
      getAllDocuments(uid, setDocs);
    }
  }, [refresh, location, isOnline]);
  return (
    <>
      {isOnline ? (
        <div className={"flex justify-center"}>
          {docs.length === 0 && (
            <NoData
              message={"You have no documents, select a job to add one."}
            />
          )}
          <div
            className={
              "grid grid-cols-1 mb-8 md:grid-cols-2 xl:grid-cols-3 gap-8 pt-8 md:pt-24 lg:pt-32 xl:pt-36"
            }
          >
            {docs.map((item, i) => {
              return (
                <div
                  key={i.toString()}
                  className={"w-full rounded bg-blue-500 shadow px-4 py-4"}
                >
                  <p
                    className={"mt-2 px-3 mb-4 font-medium text-xl text-white"}
                  >
                    {item.job_name}
                  </p>
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
        </div>
      ) : (
        <div className={"flex justify-center"}>
          <NoData
            message={"You must be online to use the documents feature."}
          />
        </div>
      )}
    </>
  );
};

export default Documents;
