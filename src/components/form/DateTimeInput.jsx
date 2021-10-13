import {IonDatetime, IonItem, IonLabel, IonText} from "@ionic/react";
import { useState } from "react";
import getYear from "date-fns/getYear";
import {addYears, parseISO, subYears} from "date-fns";
const customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
const minYear = getYear(subYears(new Date(), 10));
const maxYear = getYear(addYears(new Date(), 10));
console.log(minYear, maxYear);
const customDayShortNames = [
  "s\u00f8n",
  "man",
  "tir",
  "ons",
  "tor",
  "fre",
  "l\u00f8r",
];
export default ({ label, selectedDate, setSelectedDate,error }) => {
  return (
    <IonItem>
      <IonLabel position="stacked">{label}</IonLabel>
      <IonDatetime
        value={selectedDate}
        min={minYear}
        max={maxYear}
        dayShortNames={customDayShortNames}
        displayFormat="DD/MM/YYYY HH:mm:ss"
        monthShortNames="jan, feb, mar, apr, mai, jun, jul, aug, sep, okt, nov, des"
        onIonChange={(e) => setSelectedDate(e.detail.value)}
      />
        {error && <IonText className="form-error-text">{error}</IonText>}
    </IonItem>
  );
};
