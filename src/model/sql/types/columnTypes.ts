export type ModelSqlColumnInteger = {
    allowNull?: boolean
    type: 'INTEGER'
    options?: {
        length: number
    }
    defaultValue?: number | null
}

export type ModelSqlColumnBigint = {
    allowNull?: boolean
    type: 'BIGINT'
    options?: {
        length: number
    }
    defaultValue?: number | null
}

export type ModelSqlColumnFloat = {
    allowNull?: boolean
    type: 'FLOAT'
    options?: {
        length: number
    }
    defaultValue?: number | null
}

export type ModelSqlColumnBoolean = {
    allowNull?: boolean
    type: 'BOOLEAN'
    options?: {}
    defaultValue?: boolean | null
}

export type ModelSqlColumnString = {
    allowNull?: boolean
    type: 'STRING',
    options?: {
        length: number
    }
    defaultValue?: string | null
}

export type ModelSqlColumnText = {
    allowNull?: boolean
    type: 'TEXT',
    options?: {
        length: 'tiny' | 'medium' | 'long'
    }
    defaultValue?: string
}

export type ModelSqlColumnDateTime = {
    type: 'DATETIME',
    defaultValue?: Date | 'CURRENT_TIMESTAMP' | null
    allowNull?: boolean,
}

export type ModelSqlColumnJson<Value> = {
    type: 'JSON',
    defaultValue?: Value | null
    allowNull?: boolean,
}
