import { IonDatetime, IonItem, IonLabel, IonText } from "@ionic/react";
import getYear from "date-fns/getYear";
import { addYears, subYears } from "date-fns";

const minYear = getYear(subYears(new Date(), 10));
const maxYear = getYear(addYears(new Date(), 10));

export default ({ label, selectedDate, setSelectedDate, error }) => {
  return (
    <IonItem data-testid={"date-time-input"}>
      <IonLabel position="stacked">{label}</IonLabel>
      <IonDatetime
        value={selectedDate}
        min={minYear}
        max={maxYear}
        displayFormat="DD/MM/YYYY HH:mm:ss"
        monthShortNames="jan, feb, mar, apr, mai, jun, jul, aug, sep, okt, nov, des"
        onIonChange={(e) => setSelectedDate(e.detail.value)}
      />
      {error && <IonText className="form-error-text">{error}</IonText>}
    </IonItem>
  );
};
