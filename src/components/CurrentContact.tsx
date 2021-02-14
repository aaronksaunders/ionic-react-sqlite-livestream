import {
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonButton,
} from "@ionic/react";
import React from "react";

/**
 *
 * @param param0
 */
export const CurrentContact: React.FC<any> = ({ contact, onDelete, onEdit }) => {
  return (
    <div>
      {contact?.values[0] && (
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              <h3>Current Contact</h3>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <div>
              {contact?.values[0].first_name} {contact?.values[0].last_name}
            </div>
            {contact?.values[0].email} - {contact?.values[0].id}
          </IonCardContent>
          <IonButton
            size="small"
            style={{ margin: 8 }}
            onClick={() => onEdit(contact?.values[0].id)}
          >
            EDIT
          </IonButton>
          <IonButton
            size="small"
            color="danger"
            style={{ margin: 8 }}
            onClick={() => onDelete(contact?.values[0].id)}
          >
            DELETE
          </IonButton>

        </IonCard>
      )}
    </div>
  );
};
