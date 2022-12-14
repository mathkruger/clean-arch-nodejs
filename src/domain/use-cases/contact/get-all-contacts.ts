import { Contact } from "../../entities/contact";
import { IContactRepository } from "../../interfaces/repositories/contact-repository";
import { IGetAllContacts } from "../../interfaces/use-cases/contact/get-all-contacts";

export class GetAllContacts implements IGetAllContacts {
    contactRepository: IContactRepository;

    constructor(contactRepository: IContactRepository) {
        this.contactRepository = contactRepository;
    }

    async execute(): Promise<Contact[]> {
        const result = await this.contactRepository.getContacts();
        return result;
    }

}