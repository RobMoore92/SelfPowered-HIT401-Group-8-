import React, { useState } from "react";
import FuzzySearch from "fuzzy-search";
import { IonList, IonSearchbar } from "@ionic/react";
import { AnimatePresence, motion } from "framer-motion";
import SearchFilter from "../../components/cards/SearchFilter";
import NoData from "../../components/cards/NoData";

const variants = {
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 250,
  mass: 0.6,
};

const ListLayout = (props) => {
  const { data, filters, searchProperties, Card, cardID, noDataMessage } =
    props;
  const [search, setSearch] = useState("");
  const searcher = new FuzzySearch(data, searchProperties);

  return (
    <div className={"flex flex-col justify-start"}>
      <div
        className={
          "flex flex-col xl:flex-row  xl:justify-center xl:space-x-8 items-center mt-3 mr-1 my-2 md:my-4"
        }
      >
        <div className={"flex  justify-center sm:flex-row"}>
          {filters.map((item) => (
            <SearchFilter key={item.title} {...item} />
          ))}
        </div>
        <IonSearchbar
          className={"max-w-md"}
          value={search}
          onIonChange={(e) => setSearch(e.detail.value)}
        />
      </div>
      {data.length === 0 ? (
        <NoData message={noDataMessage} />
      ) : (
        <IonList className={"ion-no-padding ion-no-margin h-full"} lines="none">
          <AnimatePresence>
            {searcher.search(search).map((item) => {
              return (
                <motion.div
                  layout
                  key={item[cardID]}
                  transition={spring}
                  variants={variants}
                  initial={"exit"}
                  animate={"enter"}
                  exit={"exit"}
                >
                  <Card item={item} {...props} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </IonList>
      )}
    </div>
  );
};

export default ListLayout;
