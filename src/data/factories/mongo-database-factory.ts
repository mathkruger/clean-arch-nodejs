import { MongoClient, ObjectId } from "mongodb";
import { MongoDBContactDataSource } from "../data-sources/mongodb/mongodb-contact-data-source";
import { IContactDataSource } from "../interfaces/data-sources/contact-data-source";
import { DatabaseWrapper } from "../interfaces/data-sources/database-wrapper";
import { IContactDatabaseFactory } from "../interfaces/database-factory";

export class MongoDatabaseFactory implements IContactDatabaseFactory {
    async create(config: any): Promise<IContactDataSource> {
        const client: MongoClient = new MongoClient(config.uri);
        await client.connect();
    
        const db = client.db(config.database);
    
        const contactDatabase: DatabaseWrapper = {
            find: (query) => db.collection("contacts").find(query).toArray(),
            findById: (id: string) => db.collection("contacts").findOne({
                "_id": new ObjectId(id)
            }),
            insertOne: (doc) => db.collection("contacts").insertOne(doc)
        };
    
        const dataSource = new MongoDBContactDataSource(contactDatabase);
        return dataSource;
    }
}