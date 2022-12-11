import { Contact } from "../../../domain/entities/contact";

export interface IContactDataSource {
    create(contact: Contact): Promise<boolean>;
    getAll(): Promise<Contact[]>;
    get(id: string): Promise<Contact>;
}