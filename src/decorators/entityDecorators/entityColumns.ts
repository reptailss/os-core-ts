import {EntityColumn} from '@entity'

export function EntityPrimaryNumberKey() {
    return function(target: any, propertyKey: string) {
        target.constructor._primaryKey = propertyKey
    }
}

export function EntityPrimaryStringKey() {
    return function(target: any, propertyKey: string) {
        target.constructor._primaryKey = propertyKey
    }
}



export function EntityDateAdd() {
    return function(target: any, propertyKey: string) {
        target.constructor._dateAdd = propertyKey
    }
}

export function EntityDateUpdate() {
    return function(target: any, propertyKey: string) {
        target.constructor._dateUpdate = propertyKey
    }
}

export function EntityInteger(options?: {
    allowNull?: boolean
    defaultValue?: number | null
}) {
    return function(target: any, propertyKey: string) {
        if (!target.constructor._columns) {
            target.constructor._columns = {}
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options?.allowNull,
            type: 'INTEGER',
            defaultValue: options?.defaultValue,
        } satisfies EntityColumn
    }
}

export function EntityBigInt(options?: {
    allowNull?: boolean
    defaultValue?: number | null
}) {
    return function(target: any, propertyKey: string) {
        if (!target.constructor._columns) {
            target.constructor._columns = {}
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options?.allowNull,
            type: 'BIGINT',
            defaultValue: options?.defaultValue,
        } satisfies EntityColumn
    }
}

export function EntityFloat(options?: {
    allowNull?: boolean
    defaultValue?: number | null
}) {
    return function(target: any, propertyKey: string) {
        if (!target.constructor._columns) {
            target.constructor._columns = {}
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options?.allowNull,
            type: 'FLOAT',
            defaultValue: options?.defaultValue,
        } satisfies EntityColumn
    }
}

export function EntityBoolean(options?: {
    allowNull?: boolean
    defaultValue?: boolean | null
}) {
    return function(target: any, propertyKey: string) {
        if (!target.constructor._columns) {
            target.constructor._columns = {}
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options?.allowNull,
            type: 'BOOLEAN',
            defaultValue: options?.defaultValue,
        } satisfies EntityColumn
    }
}

export function EntityString(options?: {
    allowNull?: boolean
    defaultValue?: string | null
    length?: number
}) {
    return function(target: any, propertyKey: string) {
        if (!target.constructor._columns) {
            target.constructor._columns = {}
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options?.allowNull,
            type: 'STRING',
            defaultValue: options?.defaultValue,
            options: {
                length: options?.length,
            },
        } satisfies EntityColumn
    }
}

export function EntityText(options?: {
    allowNull?: boolean
    defaultValue?: string
    length?: 'tiny' | 'medium' | 'long'
}) {
    return function(target: any, propertyKey: string) {
        if (!target.constructor._columns) {
            target.constructor._columns = {}
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options?.allowNull,
            type: 'TEXT',
            defaultValue: options?.defaultValue,
            options: {
                length: options?.length,
            },
        } satisfies EntityColumn
    }
}

export function EntityDate(options?: {
    allowNull?: boolean
    defaultValue?: Date | 'CURRENT_TIMESTAMP' | null,
}) {
    return function(target: any, propertyKey: string) {
        if (!target.constructor._columns) {
            target.constructor._columns = {}
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options?.allowNull,
            type: 'DATETIME',
            defaultValue: options?.defaultValue,
        } satisfies EntityColumn
    }
}


export function EntityJson(options?: {
    allowNull?: boolean
    defaultValue?: object | null
}) {
    return function(target: any, propertyKey: string) {
        if (!target.constructor._columns) {
            target.constructor._columns = {}
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options?.allowNull,
            type: 'JSON',
            defaultValue: options?.defaultValue,
        } satisfies EntityColumn
    }
}

