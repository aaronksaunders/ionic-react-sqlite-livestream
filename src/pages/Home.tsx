import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";

import React, { useState } from "react";
import {
  queryAllContacts,
  getContactById,
  deleteContactById,
} from "../dataservice";
import { CurrentContact } from "../components/CurrentContact";
import { ContactList } from "../components/ContactList";
import { useHistory } from "react-router";

const Home: React.FC = () => {
  const [queryResults, setQueryResults] = useState<any>(null);
  const [currentContact, setCurrentContact] = useState<any>(null);
  const history = useHistory();

  useIonViewWillEnter(() => {
    queryAllContacts().then(setQueryResults);
    setCurrentContact(null);
  });

  /**
   *
   * @param contactId
   */
  const getById = async (contactId: any) => {
    const c = await getContactById(contactId);
    setCurrentContact(c);
  };

  /**
   *
   * @param contactId
   */
  const deleteContact = async (contactId: any) => {
    await deleteContactById(contactId);
    const data = await queryAllContacts();
    setQueryResults(data);
    setCurrentContact(null);
    window.alert("DELETE SUCCESS");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>IONIC REACT SQLITE</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={"/create-contact"}>NEW CONTACT</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <CurrentContact
          contact={currentContact}
          onDelete={deleteContact}
          onEdit={(id: any) => history.push(`/edit-contact/${id}`)}
        />
        <ContactList contacts={queryResults} contactClicked={getById} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
