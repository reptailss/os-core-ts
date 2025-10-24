import {IDbConnectionNoSql} from '@db'

const connections: Record<string, IDbConnectionNoSql> = {}

export class DbConnectionNoSqlCashManager {
    public static saveToCash(
        key: string,
        connection: IDbConnectionNoSql,
    ): void {
        connections[key] = connection
    }
    
    public static getFromCash(key: string): IDbConnectionNoSql | null {
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
    
    public static getAllFromCash(): Record<string, IDbConnectionNoSql> {
        return connections
    }
}