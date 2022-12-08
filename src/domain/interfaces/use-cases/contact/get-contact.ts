import { Contact } from "../../../entities/contact";

export interface IGetContact {
    execute(id: string): Promise<Contact>; 
}