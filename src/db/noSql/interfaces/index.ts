export interface IDbConnectionNoSql {
    mongoose: any
    cashedKey:string
    databaseName:string
    connect(): Promise<void>
}
