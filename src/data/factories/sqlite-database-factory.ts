import { IContactDataSource } from "../interfaces/data-sources/contact-data-source";
import { IContactDatabaseFactory } from "../interfaces/database-factory";
import { DatabaseWrapper } from "../interfaces/data-sources/database-wrapper";
import { SqliteDataSource } from "../data-sources/sqlite/sqlite-contact-data-source";
import sqlite3 from "sqlite3";
import { open } from "sqlite";


export class SqliteDatabaseFactory implements IContactDatabaseFactory {
    async create(config: any): Promise<IContactDataSource> {
        const db = await open({ filename: config.database, driver: sqlite3.Database, mode: sqlite3.OPEN_READWRITE });
        await db.run(`create table if not exists contacts
        (
            id integer primary key,
            firstName text,
            surname text,
            email text
        )`);

        const contactDatabase: DatabaseWrapper = {
            find: (query: any) => {
                const where: string = Object.keys(query).map(x => `${x} = ?`).join("AND");
                const sql: string = `SELECT * FROM contacts ${where.length > 0 ? 'WHERE ' + where : ''};`;
                return db.all(sql, Object.keys(query).map(x => query[x]));
            },
            findById: (id: string) => {
                const sql: string = `SELECT * FROM contacts WHERE id = ?;`;
                return db.get(sql, [id]);
            },
            insertOne: (doc: any) => {
                const fields = Object.keys(doc).join(",");
                const sql: string = `INSERT INTO contacts (${fields}) VALUES (${Object.keys(doc).map(x => "?")})`;
                return db.run(sql, Object.keys(doc).map(x => doc[x]));
            }
        };
    
        const dataSource = new SqliteDataSource(contactDatabase);
        return dataSource;
    }

}