import {ModelSqlColumn, ModelSqlColumns, SettingsLoadModelSql} from '@model'
import {DataTypes, Model, ModelAttributeColumnOptions, Sequelize} from 'sequelize'
import {ModelSqlColumnTypeKey, SqlIndexes} from '@model/core'
import {ModelIndexesOptions} from 'sequelize/types/model'

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

type ColumnModelSequelize<T extends object = any, A extends object = any> = ModelAttributeColumnOptions<Model<T, A>>
type ColumnsModelSequelize<T extends object = any, A extends object = any> = Record<string, ColumnModelSequelize<T, A>>

export class DbConnectionModelSqlColumnsHelper {

    static transformBaseColumnToSequelize<
        Row extends object,
        RowPrimaryKey extends string = 'id',
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update'
    >(columns: ModelSqlColumns<
          Row,
          RowPrimaryKey,
          RowDateAddKey,
          RowDateUpdateKey
      >,
      options?: SettingsLoadModelSql<
          RowPrimaryKey,
          RowDateAddKey,
          RowDateUpdateKey
      >): ColumnsModelSequelize<Row> {
        const currentPrimaryKey = options?.primaryKey || 'id'
        const currentDateAdd = typeof options?.dateAdd === 'undefined' ? 'date_add' : options?.dateAdd === null ? false : options?.dateAdd
        const currentDateUpdate = typeof options?.dateUpdate === 'undefined' ? 'date_update' : options?.dateUpdate === null ? false : options?.dateUpdate

        const newColumns: ColumnsModelSequelize<Row> = {
            [currentPrimaryKey]: {
                type: DataTypes.INTEGER({length: 11}),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
        }

        if(currentDateAdd){
            newColumns[currentDateAdd] = this.columnBaseToSequelizeColumn({
                type: 'DATETIME',
                defaultValue: 'CURRENT_TIMESTAMP',
            })
        }
        if (currentDateUpdate) {
            newColumns[currentDateUpdate] = this.columnBaseToSequelizeColumn({
                type: 'DATETIME',
                defaultValue: 'CURRENT_TIMESTAMP',
            })
        }

        for (const columnKey in columns) {
            newColumns[columnKey] = this.columnBaseToSequelizeColumn(columns[columnKey as keyof ModelSqlColumns<any, any>])
        }

        return newColumns
    }

    static getCurrentTypeColumnSequelize(column: ModelSqlColumn<any, any>) {
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
                if (column?.options?.length) {
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

    static columnBaseToSequelizeColumn<
        T extends object,
        A extends object = any
    >(column: ModelSqlColumn<any, any>): ColumnModelSequelize<T, A> {
        switch (column.type) {
            case 'INTEGER': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                }
            }

            case 'BIGINT': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                }
            }

            case 'FLOAT': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                }
            }

            case 'STRING': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                }
            }

            case 'TEXT': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    allowNull: column.allowNull,
                    defaultValue: column.defaultValue,
                }
            }


            case 'JSON': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    defaultValue: column.defaultValue,
                }
            }

            case 'DATETIME': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    defaultValue: column.defaultValue === 'CURRENT_TIMESTAMP' ? Sequelize.literal('CURRENT_TIMESTAMP') : column.defaultValue,
                }
            }
            case 'BOOLEAN': {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                    defaultValue: column.defaultValue,
                }
            }

            default: {
                return {
                    type: this.getCurrentTypeColumnSequelize(column),
                }
            }
        }
    }


    static transformDescribeSequelizeColumnToBase(column: DescribeSequelizeColumn): ModelSqlColumn<unknown, unknown> {
        const {type, options} = this.getTypeOptions(column.type)

        if (!options) {
            return {
                allowNull: column.allowNull,
                defaultValue: column.defaultValue,
                type: type as ModelSqlColumnTypeKey,
            }
        }
        return {
            allowNull: column.allowNull,
            defaultValue: column.defaultValue,
            type: this.getColumnType(type) as any,
            options: {
                length: options as number,
            },

        }
    }

    static transformIndexesToSequelize(indexes?: SqlIndexes<any>): ModelIndexesOptions[] {
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

    private static getColumnType(type: TypeDescribeSequelizeColumn): ModelSqlColumnTypeKey {
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
                return type as ModelSqlColumnTypeKey
        }
    }

}