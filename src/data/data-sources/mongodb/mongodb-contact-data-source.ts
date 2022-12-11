import { Contact } from "../../../domain/entities/contact"
import { IContactDataSource } from "../../interfaces/data-sources/contact-data-source"
import { DatabaseWrapper } from "../../interfaces/data-sources/database-wrapper"

export class MongoDBContactDataSource implements IContactDataSource {
    private database: DatabaseWrapper;

    constructor(database: DatabaseWrapper) {
        this.database = database;
    }

    async get(id: string): Promise<Contact> {
        const result = await this.database.findById(id);
        return <Contact>{
            id: result._id,
            firstName: result.firstName,
            surname: result.surname,
            email: result.email
        };
    }

    async create(contact: Contact): Promise<boolean> {
        const result = await this.database.insertOne(contact);
        return result !== null;
    }

    async getAll(): Promise<Contact[]> {
        let result = await this.database.find({});

        if (!result) result = [];
        
        return result.map(item => ({
            id: item._id.toString(),
            surname: item.surname,
            firstName: item.firstName,
            email: item.email
        }));
    }

}