export type ActionsLogsResponse = {
    all_pages: number
    all_rows: number
    error: boolean
    page: number
    per_page: number
    rows: ActionLog[]
}

export  type GetActionsLogsParams = {
    dateStart: Date
    dateEnd: Date,
    page: number
    perPage: number
    order: 'asc' | 'desc',
    orderBy: keyof ActionLog,
    serviceKey?: string
    dbType?: string
    table?: string
    rowId?: string
    database?: string
    action?: ActionLogType | null
    openUserId?:string
}

export type ActionLog = {
    service_key: string
    database: string
    db_type: string
    table: string
    action: ActionLogType
    open_user_id: number
    after: Record<string, string | number | object>
    before: Record<string, string | number | object>
    row_id: string
    _id: string
    date_add: string
    date_update: string
}


export type ActionsLogsServicesResponse = {
    all_pages: number
    all_rows: number
    error: boolean
    page: number
    per_page: number
    rows: ActionLogService[]
}
export type ActionLogService = {
    service_key: string
    id:number
    date_add:string
    date_update:string
}



export type ActionLogType = 'ADD' | 'DELETE' | 'UPDATE'

