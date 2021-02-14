import {
  IonItem,



  IonLabel
} from "@ionic/react";
import React from "react";

/**
 *
 * @param param0
 */
export const ContactList: React.FC<any> = ({ contacts, contactClicked }) => {
  return (
    <div>
      {contacts?.values?.map((contact: any) => {
        return (
          <IonItem
            onClick={() => {
              contactClicked(contact.id);
            }}
            key={contact.id}
          >
            <IonLabel>
              <div>
                {contact.first_name} {contact.last_name}
              </div>
              {contact.email} - {contact.id}
            </IonLabel>
          </IonItem>
        );
      })}
    </div>
  );
};
