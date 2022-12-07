import { Contact } from "../../entities/contact";

export interface IContactRepository { 
    createContact(contact: Contact): Promise<boolean>;
    getContacts(): Promise<Contact[]>; 
}