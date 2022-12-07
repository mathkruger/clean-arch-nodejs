import config from "../config";
import { MongoClient } from 'mongodb'
import { DatabaseWrapper } from "./interfaces/data-sources/database-wrapper";
import { MongoDBContactDataSource } from "./data-sources/mongodb/mongodb-contact-data-source";

export class DatabaseFactory {
    public static get(database: string) {
        switch(database) {
            case "mongo":
                return this.getMongoDatabase();

            case "sql":
                return this.getSqlServerDatabase();
        }
    }

    private static async getMongoDatabase() {
        const client: MongoClient = new MongoClient(config.databases.mongo.uri);
        await client.connect();
    
        const db = client.db(config.databases.mongo.database);
    
        const contactDatabase: DatabaseWrapper = {
            find: (query) => db.collection("contacts").find(query).toArray(),
            insertOne: (doc) => db.collection("contacts").insertOne(doc)
        };
    
        const dataSource = new MongoDBContactDataSource(contactDatabase);
        return dataSource;
    }

    private static getSqlServerDatabase() {
        return null;
    }
}