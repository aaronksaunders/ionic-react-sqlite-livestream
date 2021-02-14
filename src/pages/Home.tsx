import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";

import React, { useEffect, useState } from "react";
import { initdb, queryAllContacts, getContactById } from "../dataservice";
import { CurrentContact } from "../components/CurrentContact";
import { ContactList } from "../components/ContactList";


const Home: React.FC = () => {
  const [queryResults, setQueryResults] = useState<any>(null);
  const [currentContact, setCurrentContact] = useState<any>(null);
  /**
   * used to load the json into the database
   */

  useEffect(() => {
    initdb()
      .then((db: any) => {
        return queryAllContacts();
      })
      .then((results: any) => {
        setQueryResults(results);
      });
  }, []);

  /**
   * 
   * @param contactId 
   */
  const getById = async (contactId: any) => {
    const c = await getContactById(contactId);
    setCurrentContact(c);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>IONIC REACT SQLITE</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <CurrentContact contact={currentContact} />
        <ContactList contacts={queryResults} contactClicked={getById} />
      </IonContent>
    </IonPage>
  );
};

export default Home;


