import {DbNoSqlOptions, IDbConnectionNoSql} from '@db'
import mongoose, {Connection} from 'mongoose'
import {AppError} from '@appError'
import {DbConnectionNoSqlHelper} from '@db/core'


export class DbConnectionNoSql implements IDbConnectionNoSql {
    public cashedKey: string
    public mongoose!: Connection
    public databaseName: string
    
    constructor(
        databaseName: string
    ) {
        this.databaseName = databaseName
        this.cashedKey = databaseName
    }
    
    public async connect():Promise<void> {
        
        const newMongoose = await mongoose.connect(DbConnectionNoSqlHelper.getDbUrl(
            DbConnectionNoSqlHelper.getDbOptions(),
        ))
        
        if (!newMongoose?.connection) {
            throw new AppError('os-core:Error get connecting mongoose database', {
                errorKey: 'CONNECT_TO_DB_ERROR',
            })
        }
        
        const newConnectionMongoose = newMongoose.connection.useDb(this.databaseName)
        
        if (!newConnectionMongoose) {
            throw new AppError('os-core:Error connecting to mongoose database', {
                errorKey: 'CONNECT_TO_DB_ERROR',
            })
        }
        
        this.mongoose = newConnectionMongoose
    }
    
    
}