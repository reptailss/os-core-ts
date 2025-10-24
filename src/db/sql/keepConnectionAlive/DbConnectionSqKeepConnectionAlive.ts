import {IDbConnectionSql} from '@db'
import {appLogger} from '@logger'

const connections: IDbConnectionSql[] = []

export class DbConnectionSqKeepConnectionAlive {
    private static isProcess = false
    private static intervalId?: NodeJS.Timeout
    
    static keepConnectionAlive(connection: IDbConnectionSql): void {
        if (!connections.includes(connection)) {
            connections.push(connection)
        }
        
        if (this.isProcess) {
            return
        }
        
        this.intervalId = setInterval(() => {
            void Promise.all(
                connections.map(async (connection) => {
                    try {
                        await connection.query('SELECT 1')
                    } catch (error) {
                        appLogger.error('os-core: Error keep connection alive Sequelize', error)
                    }
                }),
            )
        }, 600000)
        
        this.isProcess = true
    }
    
    static stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.isProcess = false
            this.intervalId = undefined
        }
    }
}
