import {DbNoSqlOptions, IDbConnectionNoSql} from '@db'
import {DbConnectionNoSql} from '@db/core'


export class DbConnectionNoSqlFactory {
    static async getDynamicByDatabaseName({
                                              databaseName,
                                              optionsDb,
                                          }: {
        databaseName: string,
        optionsDb?: Partial<DbNoSqlOptions>
    }): Promise<IDbConnectionNoSql> {

        const dbConnectionNoSql = new DbConnectionNoSql(databaseName, optionsDb)

        await dbConnectionNoSql.init()

        return dbConnectionNoSql
    }
}
