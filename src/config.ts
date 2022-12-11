import path from "path";

const config = {
    useDatabase: "sqlite",
    databases: {
        mongo: {
            uri: "mongodb://localhost:27017/contacts",
            database: "CONTACTS_DB"
        },
        sqlite: {
            database: path.resolve(__dirname, "db/db.sqlite"),
        }
    }
}

export default config;