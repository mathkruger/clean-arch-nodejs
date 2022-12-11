import { Contact } from "../../../domain/entities/contact";
import { IContactDataSource } from "../../interfaces/data-sources/contact-data-source";
import { DatabaseWrapper } from "../../interfaces/data-sources/database-wrapper";

export class SqliteDataSource implements IContactDataSource {
    private database: DatabaseWrapper;

    constructor(database: DatabaseWrapper) {
        this.database = database;
    }

    async create(contact: Contact): Promise<boolean> {
        const result = await this.database.insertOne(contact);
        return result !== null;
    }

    async getAll(): Promise<Contact[]> {
        let result = await this.database.find({});

        if (!result) result = [];
        
        return result;
    }

    async get(id: string): Promise<Contact> {
        const result = await this.database.findById(id);
        return result;
    }

}