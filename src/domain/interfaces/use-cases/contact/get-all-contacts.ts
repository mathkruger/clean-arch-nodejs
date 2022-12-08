import { Contact } from "../../../entities/contact";

export interface IGetAllContacts { 
    execute(): Promise<Contact[]>; 
}