import express, { Response, Request } from "express";

import { IGetAllContacts } from "../../domain/interfaces/use-cases/contact/get-all-contacts";
import { ICreateContact } from "../../domain/interfaces/use-cases/contact/create-contact";
import { IGetContact } from "../../domain/interfaces/use-cases/contact/get-contact";

export default function ContactsRouter(
    getAllContactsUseCase: IGetAllContacts,
    createContactUseCase: ICreateContact,
    getContactUseCase: IGetContact
) {
    const router = express.Router();

    router.get("/", async (req: Request, res: Response) => {
        try {
            const contacts = await getAllContactsUseCase.execute();
            res.send(contacts);
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: "Error fetching data"
            });
        }
    });

    router.get("/:id", async (req: Request, res: Response) => {
        try {
            const id = req.params["id"];
            const contact = await getContactUseCase.execute(id);
            
            res.send(contact);
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: "Error fetching data"
            });
        }
    });

    router.post("/", async (req: Request, res: Response) => {
        try {
            await createContactUseCase.execute(req.body);
            res.statusCode = 201;
            res.json({
                message: "Created"
            });
        } catch (error) {
            res.status(500).send({
                message: "Error saving data"
            });
        }
    });

    return router;
}