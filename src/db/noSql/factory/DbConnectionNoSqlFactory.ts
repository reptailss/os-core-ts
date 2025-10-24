import {DbConnectionNoSql, DbConnectionNoSqlCashManager} from '@db/core'
import {IDbConnectionNoSql} from '@db'


export class DbConnectionNoSqlFactory {
    
    public static getStaticByDatabaseName(databaseName: string): IDbConnectionNoSql {
        const dbConnectionFromCash = DbConnectionNoSqlCashManager.getFromCash(databaseName)
        if (dbConnectionFromCash) {
            return dbConnectionFromCash
        }
        const connection = new DbConnectionNoSql(databaseName)
        DbConnectionNoSqlCashManager.saveToCash(databaseName, connection)
        return connection
        
    }
}
