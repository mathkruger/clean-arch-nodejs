import { ContactDataSource } from "../../data/interfaces/data-sources/contact-data-source";
import { Contact } from "../entities/contact";
import { IContactRepository } from "../interfaces/repositories/contact-repository";

export class ContactRepository implements IContactRepository {
    contactDataSource: ContactDataSource;
    
    constructor(contactDataSource: ContactDataSource) {
        this.contactDataSource = contactDataSource
    }

    async getContact(id: string): Promise<Contact> {
        const result = await this.contactDataSource.get(id);
        return result;
    }

    async createContact(contact: Contact): Promise<boolean> {
        const result = await this.contactDataSource.create(contact);
        return result;
    }

    async getContacts(): Promise<Contact[]> {
        const result = await this.contactDataSource.getAll();
        return result;
    }

}