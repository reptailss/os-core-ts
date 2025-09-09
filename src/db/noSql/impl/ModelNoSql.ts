import {DbNoSqlOptions} from '@db'
import {IModelNoSql, ModelNoSqlColumns, NoSqlIndexes, SettingsLoadModelNoSql} from '@model'
import {
    DbConnectionModelNoSqlColumnsHelper,
    DbConnectionNoSqIndexes,
    DbConnectionNoSqlFiltersBuilder,
    DbConnectionNoSqlHelper,
} from '@db/core'
import {
    ConfigModelNoSql,
    CreateAttrRowModelNoSql,
    FindOptionUpdateRowModelNoSql,
    PropsCountModelNoSql,
    PropsDeleteManyRowsModelNoSql,
    PropsDeleteRowModelNoSql,
    PropsFindAllModelNoSql,
    PropsFindByPkModelNoSql,
    PropsFindOneModelNoSql,
    ResultFindAllModelNoSql,
    ResultFindByPkModelNoSql,
    ResultFindOneModelNoSql,
    RowWithBaseFieldsModelNoSql,
} from '@model/core'
import {appLogger} from '@logger'
import {AppError} from '@appError'

import {Connection, Model} from 'mongoose'


type MongooseModel<T extends object> = Model<T>


export class ModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null) = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
> implements IModelNoSql<
    Row,
    RowDateAddKey,
    RowDateUpdateKey
> {
    private readonly dbConnectionNoSqlFiltersBuilder = new DbConnectionNoSqlFiltersBuilder()
    private readonly dbConnectionNoSqIndexes = new DbConnectionNoSqIndexes()
    private readonly dbConnection: Connection
    private readonly model: MongooseModel<Row>
    private readonly collectionName: string
    private readonly indexes?: NoSqlIndexes<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >
    private readonly databaseName: string
    private readonly optionsDb?: Partial<DbNoSqlOptions>
    
    
    constructor({
                    dbConnection,
                    columns,
                    collectionName,
                    options,
                    optionsDb,
                    databaseName,
                    indexes,
                }: {
        dbConnection: Connection,
        collectionName: string,
        columns: ModelNoSqlColumns<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >,
        indexes?: NoSqlIndexes<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >,
        options?: SettingsLoadModelNoSql<
            RowDateAddKey,
            RowDateUpdateKey
        >,
        databaseName: string,
        optionsDb?: Partial<DbNoSqlOptions>
    }) {
        
        this.dbConnection = dbConnection
        this.collectionName = collectionName
        this.databaseName = databaseName
        if (optionsDb) {
            this.optionsDb = optionsDb
        }
        const mongooseColumns = DbConnectionModelNoSqlColumnsHelper.transformBaseColumnToMongoose({
            columns,
            options,
        })
        this.model = dbConnection.model(collectionName, mongooseColumns, collectionName) as MongooseModel<Row>
        
        if (indexes && indexes?.length >= 1) {
            this.indexes = indexes
        }
    }
    
    public async syncIndexes() {
        if (!this.indexes?.length) {
            return
        }
        try {
            await this.dbConnectionNoSqIndexes.initIndexesMongoose({
                indexes: this.indexes,
                model: this.model,
                dbConnection: this.dbConnection,
                collectionName: this.collectionName,
            })
        } catch (error) {
            appLogger.error('os-core:Error init indexes mongo db', error)
        }
    }
    
    public async create(
        row: CreateAttrRowModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >):
        Promise<RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >> {
        try {
            const created = new this.model(row)
            
            await created?.save()
            
            return created as any
        } catch (error) {
            appLogger.error('os-core:Error create row mongoose', error)
            throw new AppError('os-core:Error create row mongoose', {
                errorKey: 'CREATE_ROW_ERROR',
            })
        }
    }
    
    public async createMany(rows: CreateAttrRowModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >[]): Promise<number> {
        try {
            const result = await this.model.insertMany(rows)
            return Object.keys(result)?.length
        } catch (error) {
            appLogger.error('os-core:Error create rows mongoose', error)
            throw new AppError('os-core:Error create rows mongoose', {
                errorKey: 'CREATE_ROW_ERROR',
            })
        }
    }
    
    public async update(
        row: Partial<Row>,
        options: FindOptionUpdateRowModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey,
            true
        >,
    ): Promise<RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >>
    public async update(
        row: Partial<Row>,
        options: FindOptionUpdateRowModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey,
            false
        >,
    ): Promise<void>
    
    public async update<HasReturning extends (boolean | undefined) = false>(
        row: Partial<CreateAttrRowModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >>,
        options: FindOptionUpdateRowModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey,
            HasReturning
        >,
    ): Promise<RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    > | void> {
        if (options?.hasCheckExistence) {
            const found = await this.findOne({
                where: options?.where,
                filters: options?.filters,
            })
            if (!found) {
                
                throw new AppError(
                    'Not found',
                    {
                        errorKey: 'NOT_FOUND_ERROR',
                    },
                )
            }
        }
        let res = null
        try {
            res = await this.model?.updateOne(
                this.dbConnectionNoSqlFiltersBuilder.buildFilters({
                    where: options?.where,
                    filters: options?.filters,
                }),
                row as any,
            )
            
        } catch (error) {
            appLogger.error('os-core:Error update row mongoose', error)
            throw new AppError('os-core:Error update row mongoose', {
                    errorKey: 'UPDATE_ROW_ERROR',
                },
            )
        }
        if (!res) {
            throw new AppError('os-core:Error update row mongoose', {
                    errorKey: 'UPDATE_ROW_ERROR',
                },
            )
        }
        if (!options?.returning) {
            return
        }
        
        const newRow = await this.model.findOne(options)
        if (!newRow) {
            throw new AppError('os-core:Error getting row after update mongoose', {
                    errorKey: 'UPDATE_ROW_ERROR',
                    
                },
            )
        }
        return newRow as any
    };
    
    public async destroy(props: PropsDeleteRowModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >): Promise<number> {
        try {
            const res = await this.model.deleteOne(
                this.dbConnectionNoSqlFiltersBuilder.buildFilters({
                    where: props?.where,
                    filters: props?.filters,
                }),
            )
            
            if (!res?.deletedCount) {
                throw new AppError('os-core:Error delete row mongoose',
                    {
                        errorKey: 'DELETE_ROW_ERROR',
                    },
                )
            }
            return res.deletedCount
        } catch (error) {
            appLogger.error('os-core:Error delete row mongoose', error)
            throw new AppError('os-core:Error delete row mongoose',
                {
                    errorKey: 'DELETE_ROW_ERROR',
                },
            )
        }
    };
    
    public async destroyMany(props: PropsDeleteManyRowsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >): Promise<number> {
        try {
            const res = await this.model.deleteMany(
                this.dbConnectionNoSqlFiltersBuilder.buildFilters({
                    where: props?.where,
                    filters: props?.filters,
                }),
            )
            
            if (!res?.deletedCount) {
                throw new AppError('os-core:Error delete row mongoose', {
                        errorKey: 'DELETE_ROW_ERROR',
                    },
                )
            }
            return res.deletedCount
        } catch (error) {
            appLogger.error('os-core:Error delete row mongoose', error)
            throw new AppError('os-core:Error delete row mongoose', {
                    errorKey: 'DELETE_ROW_ERROR',
                },
            )
        }
    };
    
    public async findAll<
        ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >> | undefined = undefined,
    >(
        option?: PropsFindAllModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes
        >,
    ):
        Promise<ResultFindAllModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes
        >> {
        try {
            let query = this.model?.find()
            
            if (option?.where || option?.filters) {
                query = query.find(
                    this.dbConnectionNoSqlFiltersBuilder.buildFilters({
                        where: option?.where,
                        filters: option?.filters,
                    }),
                )
            }
            
            if (option?.order) {
                query = query.sort(this.dbConnectionNoSqlFiltersBuilder.buildOrders(option.order) as any)
            }
            
            if (option?.offset) {
                query = query.skip(option.offset)
            }
            
            if (option?.limit) {
                query = query.limit(option.limit)
            }
            
            if (option?.attributes && option?.attributes?.length >= 1) {
                query = query?.select(option.attributes as string[])
            }
            
            const res = await query?.lean()
            
            if (!res?.length) {
                return [] as any as ResultFindAllModelNoSql<
                    Row,
                    RowDateAddKey,
                    RowDateUpdateKey,
                    ReturnAttributes
                >
            }
            
            
            return res as any as ResultFindAllModelNoSql<
                Row,
                RowDateAddKey,
                RowDateUpdateKey,
                ReturnAttributes
            >
        } catch (error) {
            appLogger.error('os-core:Error get rows mongoose', error)
            return [] as any as ResultFindAllModelNoSql<
                Row,
                RowDateAddKey,
                RowDateUpdateKey,
                ReturnAttributes
            >
        }
    };
    
    public async count(option?: PropsCountModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >): Promise<number> {
        try {
            const res = await this.model.countDocuments(
                this.dbConnectionNoSqlFiltersBuilder.buildFilters({
                    where: option?.where,
                    filters: option?.filters,
                }),
            )
            
            if (!res) {
                return 0
            }
            
            return res
        } catch (error) {
            appLogger.error('os-core:Error get counts mongoose', error)
            return 0
        }
    };
    
    public async findOne<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >> | undefined = undefined>(
        option: PropsFindOneModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes
        >,
    ): Promise<ResultFindOneModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey,
        ReturnAttributes
    >> {
        try {
            
            let query = this.model.findOne(
                this.dbConnectionNoSqlFiltersBuilder.buildFilters<
                    Row,
                    RowDateAddKey,
                    RowDateUpdateKey
                >({
                    where: option?.where,
                    filters: option?.filters,
                }),
            )
            
            if (option?.attributes && option?.attributes?.length >= 1) {
                query = query?.select(option.attributes as string[])
            }
            
            const res = await query?.lean() as ResultFindOneModelNoSql<
                Row,
                RowDateAddKey,
                RowDateUpdateKey,
                ReturnAttributes
            >
            
            if (!res) {
                return null
            }
            
            return res as any as ResultFindOneModelNoSql<
                Row,
                RowDateAddKey,
                RowDateUpdateKey,
                ReturnAttributes>
        } catch (error) {
            appLogger.error('os-core:Error get row mongoose', error)
            return null
        }
    };
    
    public async findByPk<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >> | undefined = undefined>(
        key: string | number,
        option?: PropsFindByPkModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes
        >,
    ): Promise<ResultFindByPkModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey,
        ReturnAttributes
    >> {
        try {
            let query = this.model.findById(key)
            
            if (option?.attributes && option?.attributes?.length >= 1) {
                query = query?.select(option.attributes as string[])
            }
            
            const res = await query?.lean() as ResultFindByPkModelNoSql<
                Row,
                RowDateAddKey,
                RowDateUpdateKey,
                ReturnAttributes
            >
            if (!res) {
                return null
            }
            
            return res as ResultFindByPkModelNoSql<
                Row,
                RowDateAddKey,
                RowDateUpdateKey,
                ReturnAttributes
            >
            
        } catch (error) {
            appLogger.error('os-core:Error get row by key mongoose', error)
            return null
        }
    };
    
    public async dropCollection():Promise<void>{
        await this.model.collection.drop()
    }
    
    
    public getConfig(): ConfigModelNoSql {
        
        const optionsDb = DbConnectionNoSqlHelper.getDbOptions(this.optionsDb)
        return {
            database: this?.databaseName || '',
            host: optionsDb?.host || '',
            port: optionsDb?.port?.toString() || '0',
            dbType: 'mongodb',
            tableName: this.collectionName,
        }
    }
}
