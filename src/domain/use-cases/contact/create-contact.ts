import { Contact } from "../../entities/contact";
import { IContactRepository } from "../../interfaces/repositories/contact-repository";
import { CreateContactUseCase } from "../../interfaces/use-cases/contact/create-contact";

export class CreateContact implements CreateContactUseCase {
    contactRepository: IContactRepository;

    constructor(contactRepository: IContactRepository) {
        this.contactRepository = contactRepository;
    }

    async execute(contact: Contact): Promise<boolean> {
        const result = await this.contactRepository.createContact(contact);
        return result;
    }

}