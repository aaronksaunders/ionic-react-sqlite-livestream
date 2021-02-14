// SQLITE IMPORTS
import { Plugins, Capacitor } from "@capacitor/core";
import { SQLiteConnection } from "@capacitor-community/sqlite";

// JSON FILE WITH DATA
import jsonData from "./import-json";

const { CapacitorSQLite } = Plugins;

const mSQLite = new SQLiteConnection(CapacitorSQLite);
let database: any;

/**
 * load from json file initial content
 */
const loadJSON = async () => {
  return await mSQLite.importFromJson(JSON.stringify(jsonData));
};

/**
 * initialize database..
 */
export const initdb = async () => {
  try {
    database = await mSQLite.createConnection(
      "testdb",
      false,
      "no-encryption",
      1
    );

    // load the default contacts
    await loadJSON();

    return database;
  } catch (e) {
    window.alert(JSON.stringify(e, null, 2));
    return null;
  }
};

/**
 * query all contacts from the database
 */
export const queryAllContacts = async () => {
  // open database
  await database.open();

  // query to get all of the contacts from database
  return database.query("SELECT * from CONTACTS;");
};

/**
 * 
 * @param contactId 
 */
export const getContactById = async (contactId: any) => {
  return await database.query("SELECT * FROM contacts WHERE id = ?;", [
    contactId + "",
  ]);
};
