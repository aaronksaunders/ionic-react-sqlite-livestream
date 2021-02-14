import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  createContact,
  getContactById,
  updateContactById,
} from "../dataservice";

const EditContact: React.FC<any> = () => {
  const { id } = useParams<any>();
  const [currentContact, setCurrentContact] = useState<any>(null);

  const [first_name, setFirstName] = useState<any>(null);
  const [last_name, setLastName] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);
  const history = useHistory();

  useEffect(() => {
    if (id) {
      getContactById(id).then((c: any) => {
        setCurrentContact(c.values[0]);

        setFirstName(c.values[0]?.first_name);
        setLastName(c.values[0]?.last_name);
        setEmail(c.values[0]?.email);
      });
    }
  }, [id]);

  /**
   *
   */
  const updateContact = async () => {
    if (id) {
      await updateContactById(id, { first_name, last_name, email });
    } else {
        console.log("calling createContact");
      await createContact({ first_name, last_name, email });
    }
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>
            {id ? `IONIC REACT SQLITE EDIT:${id}` : "IONIC REACT SQLITE CREATE"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonItem>
          <IonLabel>First Name</IonLabel>
          <IonInput
            type="text"
            value={first_name}
            onIonChange={(e: any) => setFirstName(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Last Name</IonLabel>
          <IonInput
            type="text"
            value={last_name}
            onIonChange={(e: any) => setLastName(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Email</IonLabel>
          <IonInput
            type="text"
            value={email}
            onIonChange={(e: any) => setEmail(e.target.value)}
          ></IonInput>
        </IonItem>
        <p>{currentContact?.last_modified}</p>
        <IonButton style={{ margin: 8 }} onClick={updateContact}>
         { id ? "UPDATE CONTACT" : "CREATE CONTACT" }
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditContact;
