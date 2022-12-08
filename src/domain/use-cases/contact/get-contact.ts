import { Contact } from "../../entities/contact";
import { IContactRepository } from "../../interfaces/repositories/contact-repository";
import { IGetContact } from "../../interfaces/use-cases/contact/get-contact";

export class GetContact implements IGetContact {
    
    repository: IContactRepository;

    constructor(repository: IContactRepository) {
        this.repository = repository;
    }
    
    async execute(id: string): Promise<Contact> {
        const result = await this.repository.getContact(id);
        return result;
    }

}