import { Contact } from "../../../entities/contact";

export interface ICreateContact {
    execute(contact: Contact): Promise<boolean>;
}