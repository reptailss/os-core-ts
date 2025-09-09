import {DbConnectionNoSqlFactory, DbNoSqlOptions} from '@db'
import {IModelNoSql, ModelNoSqlColumns, NoSqlIndexes, SettingsLoadModelNoSql} from '@model'
import {AppError} from '@appError'
import {DateHelper} from '@helpers'
import {appLogger} from '@logger'


const models: Record<string, IModelNoSql<any, any, any>> = {}

export class LoaderModelNoSql {
    
    static async byDatabaseNameAndCollectionName<
        Row extends object,
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update'
    >(
        props: {
            databaseName: string
            columns: ModelNoSqlColumns<Row, RowDateAddKey, RowDateUpdateKey>
            collectionName: string
            optionsDb?: DbNoSqlOptions
            options?: SettingsLoadModelNoSql<RowDateAddKey, RowDateUpdateKey>;
            indexes?: NoSqlIndexes<
                Row,
                RowDateAddKey,
                RowDateUpdateKey
            >,
        }): Promise<IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>> {
        
        const key = this.buildCollectionKey({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
        })
        
        if (key in models) {
            return models[key]
        }
        
        try {
            const dbConnection = await DbConnectionNoSqlFactory.getDynamicByDatabaseName({
                databaseName: props.databaseName,
                optionsDb: props.optionsDb,
            })
            
            const model = dbConnection.defineModel<
                Row,
                RowDateAddKey,
                RowDateUpdateKey
            >({
                collectionName: props.databaseName,
                columns: props.columns,
                options: props.options,
                indexes: props.indexes,
            })
            
            if (props.indexes && props.indexes?.length >= 1) {
                await model.syncIndexes()
            }
            
            models[key] = model
            
            return model
            
        } catch (error) {
            appLogger.error('os-core:Error get api mongoose', error)
            throw new AppError('os-core:Error get api mongoose', {
                errorKey: 'GET_MODEL_ERROR',
            })
        }
    }
    
    
    static async byDatabaseNameAndYearMonth<
        Row extends object,
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update'
    >(
        props: {
            databaseName: string
            columns: ModelNoSqlColumns<Row, RowDateAddKey, RowDateUpdateKey>
            collectionName: string
            year: number
            month: number
            optionsDb?: DbNoSqlOptions
            options?: SettingsLoadModelNoSql<RowDateAddKey, RowDateUpdateKey>
            indexes?: NoSqlIndexes<
                Row,
                RowDateAddKey,
                RowDateUpdateKey
            >,
        }): Promise<IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>> {
        
        const currentYear = DateHelper.getCurrentYear()
        const maxYear = currentYear + 1
        const minYear = currentYear - 5
        
        if (props.year > maxYear || props.year < minYear) {
            throw new AppError(`The year cannot be more than 1 year in the future or less than 5 years before the current year. You provided: [${props.year}].`, {
                errorKey: 'GET_MODEL_ERROR',
            })
        }
        
        const key = this.buildKeyByYearMonth({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
            year: props.year,
            month: props.month,
        })
        
        if (key in models) {
            return models[key]
        }
        try {
            const dbConnection = await DbConnectionNoSqlFactory.getDynamicByDatabaseName({
                databaseName: props.databaseName,
                optionsDb: props.optionsDb,
            })
            
            const model = dbConnection.defineModel<
                Row,
                RowDateAddKey,
                RowDateUpdateKey
            >({
                collectionName: this.getCollectionNameByYearMonth({
                    year: props.year,
                    collectionName: props.collectionName,
                    month: props.month,
                }),
                columns: props.columns,
                options: props.options,
                indexes: props.indexes,
            })
            
            if (props.indexes && props.indexes?.length >= 1) {
                await model.syncIndexes()
            }
            
            models[key] = model
            
            return model
            
        } catch (error) {
            appLogger.error('os-core:Error get api mongoose', error)
            throw new AppError('os-core:Error get api mongoose', {
                errorKey: 'GET_MODEL_ERROR',
            })
        }
    }
    
    static getModelKeysFromCache(): string[] {
        return Object.keys(models)
    }
    
    
    static deleteModelFromCacheByDatabaseNameAndCollectionName(props: {
        databaseName: string
        collectionName: string
    }): void {
        const key = this.buildCollectionKey({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
        })
        if (!(key in models)) {
            appLogger.error(`delete model:not found model ${key} in cache`)
            return
        }
        delete models[key]
    }
    
    private static getCollectionNameByYearMonth = ({
                                                       month,
                                                       collectionName,
                                                       year,
                                                   }: {
        year: number,
        month: number,
        collectionName: string,
    }) => {
        
        const currentMoth = month >= 10 ? month.toString() : `0${month}`
        
        return `${collectionName}_${year}_${currentMoth}`
        
    }
    
    private static formatNumber(num: number): string {
        if (num === 0) {
            return '01'
        }
        return num < 10 ? `0${num}` : `${num}`
    }
    
    private static buildKeyByYearMonth({
                                           databaseName,
                                           collectionName,
                                           year,
                                           month,
                                       }: {
        databaseName: string
        collectionName: string
        year: number
        month: number
    }): string {
        return `${databaseName}_${collectionName}_${year}_${this.formatNumber(month)}`
    }
    
    
    private static buildCollectionKey(props: {
        databaseName: string
        collectionName: string
    }): string {
        return `${props.databaseName}_${props.collectionName}`
    }
}
