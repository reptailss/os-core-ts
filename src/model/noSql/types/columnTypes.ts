export type ModelNoSqlColumnInteger = {
    type: 'INTEGER',
    defaultValue?: number | null,
}

export type ModelNoSqlColumnString = {
    type: 'STRING',
    defaultValue?: string | null,
}


export type ModelNoSqlColumnDateTime = {
    type: 'DATETIME',
    defaultValue?: Date | 'CURRENT_TIMESTAMP' | null,
}

export type ModelNoSqlColumnObject<Value> = {
    type: 'OBJECT',
    defaultValue?: Value | null,
}


