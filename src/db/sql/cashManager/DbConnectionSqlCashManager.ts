import {IDbConnectionSql} from '@db'

const connections: Record<string, IDbConnectionSql> = {}

export class DbConnectionSqlCashManager {
    public static saveToCash(
        key: string,
        connection: IDbConnectionSql,
    ): void {
        connections[key] = connection
    }
    
    public static getFromCash(key: string): IDbConnectionSql | null {
        if (key in connections) {
            return connections[key]
        }
        return null
    }
    
    public static deleteFromCash(key: string): void {
        if (key in connections) {
            delete connections[key]
        }
    }
    
    public static getAllFromCash(): Record<string, IDbConnectionSql> {
        return connections
    }
}