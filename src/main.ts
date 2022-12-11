import config from './config';
import server from './server';
import ContactsRouter from './presentation/routers/contact-router';

import { exit } from 'process';
import { ContactDatabaseFactory } from './data/contact-database-factory';
import { ContactRepository } from './domain/repositories/contact-repository';
import { CreateContact } from './domain/use-cases/contact/create-contact';
import { GetAllContacts } from './domain/use-cases/contact/get-all-contacts';
import { GetContact } from './domain/use-cases/contact/get-contact';

(async () => {
    const dataSource = await ContactDatabaseFactory.get(config.useDatabase);
    
    if (!dataSource) {
        console.error("Please, select a valid database!");
        exit(-1);
    }

    const repository = new ContactRepository(dataSource);

    const contactMiddleWare = ContactsRouter(
        new GetAllContacts(repository),
        new CreateContact(repository),
        new GetContact(repository)
    );

    server.use("/contact", contactMiddleWare);
    server.listen(4000, () => console.log("Running server on port 4000"));
})();