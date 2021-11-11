import {
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonTextarea,
} from "@ionic/react";

export default ({
  values,
  errors,
  handleChange,
  id,
  label,
  type,
  placeholder,
  textarea,
}) => {
  return (
    <IonItem>
      <IonLabel for={id} position="stacked">
        {label}
      </IonLabel>
      {textarea ? (
        <IonTextarea
          type={type || "text"}
          name={id}
          placeholder={placeholder}
          value={values[id]}
          onIonChange={handleChange}
        />
      ) : (
        <IonInput
          type={type || "text"}
          name={id}
          placeholder={placeholder}
          value={values[id]}
          onIonChange={handleChange}
        />
      )}
      {errors[id] && (
        <IonText className="form-error-text">{errors[id]}</IonText>
      )}
    </IonItem>
  );
};
