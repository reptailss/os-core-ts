import {DataTypes, Sequelize} from 'sequelize'
import {EntityColumn} from '@entity'
import {SqlIndexes} from '@repository/core'

type TypeDescribeSequelizeColumn =
    'INT' |
    'DATETIME' |
    'VARCHAR' |
    'LONGTEXT' |
    'FLOAT' |
    'BIGINT' |
    'JSON' |
    string


type DescribeSequelizeColumn = {
    type: TypeDescribeSequelizeColumn,
    primaryKey?: boolean,
    allowNull?: boolean,
    autoIncrement?: boolean,
    defaultValue?: any,
}

type ColumnModelSequelize<T extends object = any, A extends object = any> = any
type ColumnsModelSequelize<T extends object = any, A extends object = any> = Record<string, ColumnModelSequelize<T, A>>

export class DbConnectionSqlColumnsHelper {
    
    static transformEntityColumnsToSequelize<
        ClassEntity extends object
    >(columns: Record<keyof ClassEntity, EntityColumn>,
      dialect: string,
      options?: {
          primaryKey?: string | null
          dateAdd?: string | null
          dateUpdate?: string | null
      }): ColumnsModelSequelize<any> {
        
        const newColumns: ColumnsModelSequelize<any> = {}
        
        if (options?.primaryKey) {
            newColumns[options.primaryKey] = {
                type: DataTypes.INTEGER({length: 11}),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            }
        }
        
        if (options?.dateAdd) {
            newColumns[options.dateAdd] = this.entityColumnToSequelizeColumn({
                type: 'DATETIME',
                defaultValue: 'CURRENT_TIMESTAMP',
            }, dialect)
        }
        if (options?.dateUpdate) {
            newColumns[options?.dateUpdate] = this.entityColumnToSequelizeColumn({
                type: 'DATETIME',
                defaultValue: 'CURRENT_TIMESTAMP',
            }, dialect)
        }
        
        for (const columnKey in columns) {
            newColumns[columnKey] = this.entityColumnToSequelizeColumn(columns[columnKey as keyof ClassEntity], dialect)
        }
        
        return newColumns
    }
    
    
    static entityColumnToSequelizeColumn<
        T extends object,
        A extends object = any
    >(
        column: EntityColumn,
        dialect: string,
    ): ColumnModelSequelize<T, A> {
        switch (column.type) {
            case 'INTEGER': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column, dialect),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                }
            }
            case 'BIGINT': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column, dialect),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                }
            }
            case 'FLOAT': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column, dialect),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                }
            }
            case 'STRING': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column, dialect),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                }
            }
            case 'TEXT': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column, dialect),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                }
            }
            case 'JSON': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column, dialect),
                    defaultValue: column.defaultValue,
                }
            }
            case 'DATETIME': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column, dialect),
                    defaultValue: column.defaultValue === 'CURRENT_TIMESTAMP' ? Sequelize.literal('CURRENT_TIMESTAMP') : column.defaultValue,
                }
            }
            case 'BOOLEAN': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column, dialect),
                    defaultValue: column.defaultValue,
                }
            }
            case 'PRIMARY_KEY': {
                return {
                    type: DataTypes.INTEGER(),
                    autoIncrement: column.autoIncrement,
                    primaryKey: true,
                    allowNull: column.allowNull,
                }
            }
            default: {
                return {
                    type: this.getCurrentTypeColumnSequelize(column, dialect),
                }
            }
        }
    }
    
    
    static transformDescribeSequelizeColumnToEntity(column: DescribeSequelizeColumn): EntityColumn {
        const {type, options} = this.getTypeOptions(column.type)
        
        
        if (!options) {
            return {
                allowNull: column.allowNull,
                defaultValue: column.defaultValue,
                type: type as EntityColumn['type'],
            } as any
        }
        return {
            allowNull: column.allowNull,
            defaultValue: column.defaultValue,
            type: this.getColumnType(type) as EntityColumn['type'],
            options: options as any,
            
        } as any
    }
    
    static transformIndexesToSequelize(indexes?: SqlIndexes<any>): any[] {
        if (!indexes?.length) {
            return []
        }
        
        return indexes.map((index) => {
            return {
                ...(index.options?.name ? {name: index.options.name} : {}),
                ...(index.options?.unique ? {unique: index.options.unique} : {}),
                ...(index.options?.using ? {using: index.options.using} : {}),
                fields: Object.entries(index.columns).map(([name, options]) => {
                    return {
                        name,
                        ...(options?.order ? {order: options?.order} : {}),
                        ...(options?.length ? {length: options?.length} : {}),
                    }
                }),
            }
        })
    }
    
    private static getTypeOptions(input: string): {options: string | number | null; type: string} {
        const match = input.match(/^(.*?)(\s*\((.*?)\))?$/)
        const type = match ? match[1].trim() : ''
        const options = match && match[2] ? match[3]?.trim() : null
        
        let parsedOptions: number | string | null = null
        
        if (options) {
            const numericValue = parseFloat(options)
            parsedOptions = isNaN(numericValue) ? options : numericValue
        }
        
        return {options: parsedOptions, type}
    }
    
    private static getColumnType(type: TypeDescribeSequelizeColumn): EntityColumn['type'] {
        switch (type) {
            case 'INT':
                return 'INTEGER'
            case 'DATETIME':
                return 'DATETIME'
            case 'VARCHAR':
                return 'STRING'
            case 'LONGTEXT':
                return 'TEXT'
            case 'FLOAT':
                return 'FLOAT'
            case 'BIGINT':
                return 'BIGINT'
            case 'JSON':
                return 'JSON'
            default :
                return type as EntityColumn['type']
        }
    }
    
    private static getCurrentTypeColumnSequelize(column: EntityColumn, dialect: string) {
        switch (column.type) {
            case 'INTEGER': {
                if (column?.options?.length) {
                    return DataTypes.INTEGER(column.options.length as any)
                }
                return DataTypes.INTEGER()
            }
            
            case 'BIGINT': {
                if (column?.options?.length) {
                    return DataTypes.BIGINT(column.options.length as any)
                }
                return DataTypes.BIGINT()
            }
            
            case 'FLOAT': {
                if (column?.options?.length) {
                    return DataTypes.BIGINT(column.options.length as any)
                }
                return DataTypes.BIGINT()
            }
            
            case 'STRING': {
                if (column?.options?.length) {
                    return DataTypes.STRING(column.options.length as number)
                }
                return DataTypes.STRING()
            }
            
            case 'TEXT': {
                if (column?.options?.length && dialect !== 'sqlite') {
                    return DataTypes.TEXT(column.options.length as any)
                }
                return DataTypes.TEXT()
            }
            case 'JSON': {
                return DataTypes.JSON()
            }
            
            case 'DATETIME': {
                return 'DATETIME'
            }
            
            case 'BOOLEAN': {
                return DataTypes.BOOLEAN()
            }
            default :
                return DataTypes.STRING()
        }
    }
    
}