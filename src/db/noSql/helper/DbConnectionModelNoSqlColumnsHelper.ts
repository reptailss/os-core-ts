import {Schema, SchemaDefinitionProperty, Types} from 'mongoose'
import {Entity, EntityColumn} from '@entity'
import {AppError} from '@appError'

export class DbConnectionModelNoSqlColumnsHelper {
    static transformBaseColumnToMongoose<
        ClassEntity extends object
    >(columns: Record<keyof ClassEntity, EntityColumn>,
      options?: {
          primaryKey?: string | null
          dateAdd?: string | null
          dateUpdate?: string | null
      }): Schema<Entity<ClassEntity>> {
        {
            
            const fields: Record<string, SchemaDefinitionProperty> = {}
            
            if (options?.primaryKey && options.primaryKey !== '_id') {
                fields['_id'] = false as any
                fields[options.primaryKey] = this.getCurrentSchemaMongoose({
                    type: 'PRIMARY_KEY',
                })
                
            }
            
            for (const columnKey in columns) {
                fields[columnKey] = this.getCurrentSchemaMongoose(columns[columnKey])
            }
            
            return new Schema<Entity<ClassEntity>>(fields, {
                versionKey: false,
                minimize: false,
                timestamps: {
                    createdAt: options?.dateAdd || false,
                    updatedAt: options?.dateUpdate || false,
                },
            })
        }
    }
    
    static getCurrentSchemaMongoose = (column: EntityColumn): SchemaDefinitionProperty<any> => {
        switch (column.type) {
            case 'INTEGER': {
                return {
                    type: Number,
                    default: column.defaultValue,
                }
            }
            case 'BIGINT': {
                return {
                    type: Number,
                    default: column.defaultValue,
                }
            }
            
            case 'FLOAT': {
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
            case 'TEXT': {
                return {
                    type: String,
                    default: column.defaultValue,
                }
                
            }
            case 'JSON': {
                return {
                    type: Object,
                    default: column.defaultValue,
                }
            }
            case 'BOOLEAN': {
                return {
                    type: Boolean,
                    default: column.defaultValue,
                }
            }
            
            case 'PRIMARY_KEY': {
                return {
                    type: Types.ObjectId,
                    default: () => new Types.ObjectId(),
                    index: true,
                    unique: true,
                    required: true,
                    
                }
            }
            case 'DATETIME': {
                return {
                    type: Date,
                    default: column.defaultValue === 'CURRENT_TIMESTAMP' ? Date.now : column.defaultValue,
                }
            }
            
            default: {
                throw new AppError(`Not found entity type in column ${JSON.stringify(column)}`)
            }
        }
        
        
    }
    
    
}