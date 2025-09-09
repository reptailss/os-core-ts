import {Schema, SchemaDefinitionProperty} from 'mongoose'
import {ModelNoSqlColumn, ModelNoSqlColumns, SettingsLoadModelNoSql} from '@model'

export class DbConnectionModelNoSqlColumnsHelper {
    static transformBaseColumnToMongoose<
        Row extends object,
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update',
    >({
          columns,
          options,
      }: {
        columns: ModelNoSqlColumns<Row, RowDateAddKey, RowDateUpdateKey>,
        options?: SettingsLoadModelNoSql<RowDateAddKey, RowDateUpdateKey>,
    }): Schema<Row> {
        {

            const fields: Record<string, SchemaDefinitionProperty> = {}

            for (const columnKey in columns) {
                //@ts-ignore
                fields[columnKey] = this.getCurrentSchemaMongoose(columns[columnKey as keyof ModelNoSqlColumns<any, any>])
            }

            return new Schema<Row>(fields, {
                versionKey: false,
                minimize: false,
                timestamps: {
                    createdAt: options?.dateAdd === null ? false :  options?.dateAdd || 'date_add',
                    updatedAt: options?.dateUpdate  === null ? false : options?.dateUpdate || 'date_update',
                },
            })
        }
    }

    static getCurrentSchemaMongoose = (column: ModelNoSqlColumn<any, any>): SchemaDefinitionProperty<any> => {
        switch (column.type) {
            case 'INTEGER': {
                return {
                    type: Number,
                    default: column.defaultValue,
                }
            }
            case 'STRING': {
                return {
                    type: String,
                    default: column.defaultValue,
                }

            }

            case 'OBJECT': {
                return {
                    type: Object,
                    default: column.defaultValue,
                }
            }
            case 'DATETIME': {
                return {
                    type: Date,
                    default: column.defaultValue === 'CURRENT_TIMESTAMP' ? Date.now : column.defaultValue,
                }
            }

            default: {
                return {
                    type: String,
                }
            }
        }


    }


}