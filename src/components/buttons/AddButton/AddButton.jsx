import { IonFabButton, IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AddButton = ({ setPopped }) => {
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    setZoom(true);
    const timer = setTimeout(() => {
      setZoom(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  const variants = {
    in: {
      scale: 1,
    },
    out: {
      scale: 1.3,
      rotate: 360,
    },
  };
  return (
    <motion.div
      data-testid={"add-button"}
      transition={{ delay: 0.2, duration: 0.6 }}
      animate={zoom ? "out" : "in"}
      variants={variants}
    >
      <IonFabButton
        style={{ "--background": "#46d530" }}
        slot="end"
        className="menu-button"
        size="small"
        onClick={() => {
          setPopped(true);
        }}
      >
        <IonIcon className={"menu-button-icon"} icon={addOutline} />
      </IonFabButton>
    </motion.div>
  );
};

export default AddButton;
