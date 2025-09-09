import {ActionLogType} from "@packages/actionsLogger/containers/actionsLogs/types";

export const buildActionsLogsFilters = ({
                                            dbType,
                                            database,
                                            rowId,
                                            action,
                                            table,
                                            openUserId,
                                            serviceKey,
                                        }: {
    serviceKey?: string
    dbType?: string
    table?: string
    rowId?: string
    database?: string
    action?: ActionLogType | null
    openUserId?: string
}) => {

    return {
        where: {
            ...(serviceKey ? {service_key: serviceKey} : {}),
            ...(dbType ? {db_type: dbType} : {}),
            ...(table ? {table} : {}),
            ...(rowId ? {row_id: rowId} : {}),
            ...(database ? {database: database} : {}),
            ...(action ? {action: action} : {}),
            ...(openUserId ? {open_user_id: openUserId} : {}),
        }
    }
}