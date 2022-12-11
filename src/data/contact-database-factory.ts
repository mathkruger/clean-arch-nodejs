import config from "../config";
import { MongoDatabaseFactory } from "./factories/mongo-database-factory";
import { SqliteDatabaseFactory } from "./factories/sqlite-database-factory";

export class ContactDatabaseFactory {
    public static get(database: string) {
        switch(database) {
            case "mongo":
                return new MongoDatabaseFactory().create(config.databases.mongo);

            case "sqlite":
                return new SqliteDatabaseFactory().create(config.databases.sqlite);
        }
    }
}