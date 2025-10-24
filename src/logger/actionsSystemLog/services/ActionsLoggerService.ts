import {ActionsSystemLogType, DbSystemLogType} from '@logger/core'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {SystemEndpointsHelper, SystemRequestHelper} from '@helpers'
import {appLogger, IActionsLoggerService} from '@logger'
import {AppError} from '@appError'
import {Injectable} from '@decorators'

@Injectable()
export class ActionsLoggerService implements IActionsLoggerService {
    
    public async logCreateAction({
                                     value,
                                     openUserId,
                                     config,
                                     rowId,
                                 }: {
        value: Record<string, unknown>
        openUserId: number
        rowId: string | number
        config: {
            tableName: string,
            dbType: DbSystemLogType,
            database: string,
        }
    }): Promise<void> {
        return await this.sendActionSystemLog({
            database: config.database,
            dbType: config.dbType,
            table: config.tableName,
            after: value,
            action: 'ADD',
            openUserId,
            rowId,
        })
    }
    
    
    public async logUpdateAction({
                                     newValue,
                                     oldValue,
                                     openUserId,
                                     config,
                                     rowId,
                                 }: {
        oldValue: Record<string, unknown>
        newValue: Record<string, unknown>
        openUserId: number
        rowId: string | number
        config: {
            tableName: string,
            dbType: DbSystemLogType
            database: string,
        }
    }): Promise<void> {
        return await this.sendActionSystemLog({
            database: config.database,
            dbType: config.dbType,
            table: config.tableName,
            after: oldValue,
            before: newValue,
            action: 'UPDATE',
            openUserId,
            rowId,
        })
    }
    
    public async logDeleteAction({
                                     oldValue,
                                     openUserId,
                                     config,
                                     rowId,
                                 }: {
        oldValue: Record<string, unknown>
        openUserId: number,
        rowId: string | number
        config: {
            tableName: string,
            dbType: DbSystemLogType
            database: string,
        }
    }): Promise<void> {
        await this.sendActionSystemLog({
            database: config.database,
            dbType: config.dbType,
            table: config.tableName,
            before: oldValue,
            action: 'DELETE',
            openUserId,
            rowId,
        })
    }
    
    
    private async sendActionSystemLog({
                                          openUserId,
                                          database,
                                          dbType,
                                          table,
                                          after,
                                          action,
                                          before,
                                          rowId,
                                      }: {
        openUserId: number,
        table: string,
        action: ActionsSystemLogType
        dbType: DbSystemLogType
        database: string
        before?: Record<string, unknown>
        after?: Record<string, unknown>
        rowId: string | number
    }): Promise<void> {
        if (!APP_CONFIG_OS_CORE.logger.hasSendActionSystemLogger) {
            return
        }
        if (!APP_CONFIG_OS_CORE.urls.actionsSystemLoggerServiceUrl) {
            throw new AppError('Not found actions system logger api url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        try {
            const {
                transformAfter,
                transformBefore,
            } = this.buildAfterAndBeforeData({
                after,
                action,
                before,
            })
            if (
                !Object.keys(transformAfter).length &&
                !Object.keys(transformBefore).length
            ) {
                return
            }
            await SystemRequestHelper.post({
                url: APP_CONFIG_OS_CORE.urls.actionsSystemLoggerServiceUrl + SystemEndpointsHelper.buildSystemEndpointUrl('/system-logs/add'),
                body: JSON.stringify({
                    service_key: APP_CONFIG_OS_CORE.serviceKey,
                    database,
                    db_type: dbType,
                    table,
                    action,
                    open_user_id: openUserId,
                    before: transformBefore,
                    after: transformAfter,
                    row_id: String(rowId),
                }),
                serviceKey: 'actions-logger',
                headers: {
                    'content-type': 'application/json',
                },
            })
            
        } catch (error) {
            appLogger.error('os-core:Error send api system log', error)
        }
    }
    
    
    private buildAfterAndBeforeData({
                                        after,
                                        before,
                                        action,
                                    }: {
        after?: Record<string, unknown>
        before?: Record<string, unknown>
        action: ActionsSystemLogType,
    }): {
        transformAfter: Record<string, unknown>
        transformBefore: Record<string, unknown>
    } {
        if (action === 'ADD') {
            return {
                transformBefore: {},
                transformAfter: after || {},
            }
        }
        if (action === 'DELETE') {
            return {
                transformBefore: before || {},
                transformAfter: {},
            }
        }
        if (!before) {
            return {
                transformBefore: {},
                transformAfter: after || {},
            }
        }
        
        if (!after) {
            return {
                transformBefore: before || {},
                transformAfter: {},
            }
        }
        
        
        const transformBefore: Record<string, unknown> = {}
        const transformAfter: Record<string, unknown> = {}
        
        for (const key in after) {
            if (
                key === 'date_update' ||
                key === 'date_add'
            ) {
                continue
            }
            if (!this.checkHasChange(before[key], after[key])) {
                continue
            }
            transformBefore[key] = before[key]
            transformAfter[key] = after[key]
        }
        
        return {
            transformBefore,
            transformAfter,
        }
    }
    
    private checkHasChange(
        before: unknown,
        after: unknown,
    ): boolean {
        if (typeof after === 'object') {
            try {
                return JSON.stringify(before) !== JSON.stringify(after)
            } catch (error) {
                return true
            }
        }
        return before !== after
    }
    
}