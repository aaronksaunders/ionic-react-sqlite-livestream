const now = parseInt(new Date().getTime() / 1000);
console.log(now);
const dataToImport = {
  database: "testdb",
  version: 1,
  encrypted: false,
  mode: "full",
  tables: [
    {
      name: "contacts",
      schema: [
        { column: "id", value: "INTEGER PRIMARY KEY NOT NULL" },
        { column: "email", value: "TEXT UNIQUE NOT NULL" },
        { column: "first_name", value: "TEXT" },
        { column: "last_name", value: "TEXT" },
        {
          column: "last_modified",
          value: "INTEGER DEFAULT (strftime('%s', 'now'))",
        },
      ],
      indexes: [{ name: "index_user_on_email", column: "email" }],
      values: [
        [1, "whiteleys@mail.com", "Whiteley", "Smith", now],
        [2, "johnj@mail.com", "John", "jones", now],
        [3, "bill@mail.com", "Bill", "brown", now],
        [4, "newGuy@mail.com", "New", "Guy", now],
      ],
    },
  ],
};
export default dataToImport;

//CREATE TRIGGER contacts_trigger_last_modified AFTER UPDATE ON contacts FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified BEGIN UPDATE contacts SET last_modified = (strftime('%s','now')) WHERE id=OLD.id; END;
