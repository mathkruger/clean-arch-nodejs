const config = {
    useDatabase: "mongo",
    databases: {
        mongo: {
            uri: "mongodb://localhost:27017/contacts",
            database: "CONTACTS_DB"
        },
        sql: {
            server: "",
            userName: "",
            password: "",
            database: ""
        }
    }
}

export default config;