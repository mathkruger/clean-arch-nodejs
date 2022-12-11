export interface DatabaseWrapper { 
    find(query: object): Promise<any[] | undefined>
    findById(id: string): Promise<any>
    insertOne(doc: any): Promise<any> 
}