import {DbConnectionSqKeepConnectionAlive, DbConnectionSqlCashManager} from '@db/core'

export class DbConnectionsSqlManager {
    public static async closeAllDbConnectionsSql(): Promise<void> {
        const connections = DbConnectionSqlCashManager.getAllFromCash()
        for (const key in connections) {
            await connections[key].close()
            DbConnectionSqlCashManager.deleteFromCash(key)
        }
        DbConnectionSqKeepConnectionAlive.stop()
    }
}