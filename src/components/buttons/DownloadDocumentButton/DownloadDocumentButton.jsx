import React, { useEffect, useRef, useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { downloadDocument } from "../../../firebase/queries/documentQueries";

const DownloadDocumentButton = (props) => {
  const { fullPath, refresh, setRefresh } = props;
  const linkRef = useRef(null);
  const [link, setLink] = useState();
  useEffect(() => {
    if (link) {
      linkRef.current.click();
    }
  }, [link]);
  return (
    <IonButton
      className={"ion-no-padding"}
      fill="clear"
      onClick={() => {
        downloadDocument(fullPath).then((r) => setLink(r));
      }}
    >
      <a ref={linkRef} href={link} download />
      <IonIcon
        className={`text-xl text-gray-700 mr-1`}
        icon={downloadOutline}
      />
    </IonButton>
  );
};

export default DownloadDocumentButton;
