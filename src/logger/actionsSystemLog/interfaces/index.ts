import {DbSystemLogType} from '@logger/core'

export interface IActionsLoggerService {
    
    logCreateAction(props: {
        value: Record<string, unknown>
        openUserId: number
        rowId: string | number
        config: {
            tableName: string,
            dbType: DbSystemLogType
            database: string
        }
    }): Promise<void>
    
    
    logUpdateAction(props: {
        oldValue: Record<string, unknown>
        newValue: Record<string, unknown>
        openUserId: number
        rowId: string | number
        config: {
            tableName: string,
            dbType: DbSystemLogType
            database: string
        }
    }): Promise<void>
    
    logDeleteAction(props: {
        oldValue: Record<string, unknown>
        openUserId: number
        rowId: string | number
        config: {
            tableName: string
            dbType: DbSystemLogType
            database: string
        }
    }): Promise<void>
}