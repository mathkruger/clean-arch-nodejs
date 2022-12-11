import { IContactDataSource } from "./data-sources/contact-data-source";

export interface IContactDatabaseFactory {
    create(config: any): Promise<IContactDataSource>;
}