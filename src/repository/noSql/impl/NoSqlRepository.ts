import {DbNoSqlOptions, IDbConnectionNoSql} from '@db'
import {
    DbConnectionModelNoSqlColumnsHelper,
    DbConnectionNoSqIndexes,
    DbConnectionNoSqlQueryBuilder,
    DbConnectionNoSqlHelper,
} from '@db/core'
import {appLogger} from '@logger'
import {AppError} from '@appError'

import {Connection, Model} from 'mongoose'
import {INoSqlRepository} from '@repository'
import {CreateEntity, Entity, EntityClass, UpdateEntity} from '@entity'
import {
    NoSqlIndexes,
    NoSqlRepositoryFindAllOptions,
    NoSqlRepositoryFindOptions,
    NoSqlRepositoryPaginationOptions,
    NoSqlRow,
} from '@repository/core'
import {PaginationQueryParams, PaginationValues} from '@pagination'


type MongooseModel<T extends object> = Model<T>


export class NoSqlRepository<
    ClassEntity extends object
> implements INoSqlRepository<
    ClassEntity
> {
    private readonly dbConnectionNoSqlFiltersBuilder = new DbConnectionNoSqlQueryBuilder()
    private readonly dbConnectionNoSqIndexes:DbConnectionNoSqIndexes<ClassEntity>
    private readonly dbConnection: Connection
    private readonly model: MongooseModel<Entity<ClassEntity>>
    private readonly collectionName: string
    private readonly indexes?: NoSqlIndexes<ClassEntity>
    private readonly databaseName: string
    private readonly optionsDb?: Partial<DbNoSqlOptions>
    
    
    constructor(
        dbConnection: IDbConnectionNoSql,
        collectionName: string,
        classEntity: ClassEntity,
        indexes?: NoSqlIndexes<ClassEntity>,
    ) {
        
        this.dbConnection = dbConnection.mongoose
        this.collectionName = collectionName
        this.databaseName = dbConnection.databaseName
        const entity: EntityClass = classEntity as EntityClass
        const mongooseColumns = DbConnectionModelNoSqlColumnsHelper.transformBaseColumnToMongoose(entity._columns, {
            primaryKey: entity._primaryKey,
            dateAdd: entity._dateAdd,
            dateUpdate: entity._dateUpdate,
        })
        this.model = dbConnection.mongoose.model(collectionName, mongooseColumns, collectionName) as unknown as MongooseModel<Entity<ClassEntity>>
        
        if (indexes && indexes?.length >= 1) {
            this.indexes = indexes
        }
        this.dbConnectionNoSqIndexes = new DbConnectionNoSqIndexes<ClassEntity>(classEntity)
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
        createEntity: CreateEntity<ClassEntity>,
    ): Promise<Entity<ClassEntity>> {
        try {
            const created = new this.model(createEntity)
            
            await created?.save()
            
            return created as any
        } catch (error) {
            appLogger.error('os-core:Error create row mongoose', error)
            throw new AppError('os-core:Error create row mongoose', {
                errorKey: 'CREATE_ROW_ERROR',
            })
        }
    }
    
    public async createMany(createEntities: CreateEntity<ClassEntity>[]): Promise<number> {
        try {
            const result = await this.model.insertMany(createEntities)
            return Object.keys(result)?.length
        } catch (error) {
            appLogger.error('os-core:Error create rows mongoose', error)
            throw new AppError('os-core:Error create rows mongoose', {
                errorKey: 'CREATE_ROW_ERROR',
            })
        }
    }
    
    
    public async update<HasReturning extends boolean = false>(
        updateEntity: UpdateEntity<ClassEntity>,
        findOptions: NoSqlRepositoryFindOptions<ClassEntity>,
        hasReturning?: HasReturning,
    ): Promise<HasReturning extends true ? Entity<ClassEntity> : undefined> {
        let res = null
        try {
            res = await this.model?.updateOne(
                this.dbConnectionNoSqlFiltersBuilder.buildWhere(
                    findOptions?.where,
                    findOptions?.clientWhere,
                ),
                updateEntity as any,
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
        if (!hasReturning) {
            return undefined as HasReturning extends true ? Entity<ClassEntity> : undefined
        }
        
        const newRow = await this.model.findOne(findOptions)
        if (!newRow) {
            throw new AppError('os-core:Error getting row after update mongoose', {
                    errorKey: 'UPDATE_ROW_ERROR',
                    
                },
            )
        }
        return newRow as unknown as HasReturning extends true ? Entity<ClassEntity> : undefined
    };
    
    public async updateMany(
        updateEntity: UpdateEntity<ClassEntity>,
        findOptions: NoSqlRepositoryFindOptions<ClassEntity>,
    ): Promise<number> {
        try {
            const result = await this.model.updateMany(
                this.dbConnectionNoSqlFiltersBuilder.buildWhere(
                    findOptions?.where,
                    findOptions?.clientWhere,
                ),
                updateEntity as any,
            )
            return Object.keys(result)?.length
        } catch (error) {
            appLogger.error('os-core:Error create rows mongoose', error)
            throw new AppError('os-core:Error create rows mongoose', {
                errorKey: 'CREATE_ROW_ERROR',
            })
        }
    }
    
    public async destroy(
        findOptions: NoSqlRepositoryFindOptions<ClassEntity>,
    ): Promise<number> {
        try {
            const res = await this.model.deleteOne(
                this.dbConnectionNoSqlFiltersBuilder.buildWhere(
                    findOptions?.where,
                    findOptions?.clientWhere,
                ),
            )
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
    
    public async destroyMany(
        findOptions: NoSqlRepositoryFindOptions<ClassEntity>,
    ): Promise<number> {
        try {
            const res = await this.model.deleteMany(
                this.dbConnectionNoSqlFiltersBuilder.buildWhere(
                    findOptions?.where,
                    findOptions?.clientWhere,
                ),
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
    
    public async count(
        findOptions: NoSqlRepositoryFindOptions<ClassEntity>,
    ): Promise<number> {
        try {
            const res = await this.model.countDocuments(
                this.dbConnectionNoSqlFiltersBuilder.buildWhere(
                    findOptions?.where,
                    findOptions?.clientWhere,
                ),
            )
            
            if (!res) {
                return 0
            }
            
            return res
        } catch (error) {
            appLogger.error('os-core:Error get counts mongoose', error)
            throw new AppError('os-core:Error get counts mongoose', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }
    
    
    public async findOne(
        findOptions: NoSqlRepositoryFindOptions<ClassEntity>,
    ): Promise<Entity<ClassEntity> | null> {
        try {
            let query = this.model.findOne(
                this.dbConnectionNoSqlFiltersBuilder.buildWhere(
                    findOptions?.where,
                    findOptions?.clientWhere,
                ),
            )
            const res = await query?.lean()
            if (!res) {
                return null
            }
            return res as unknown as Entity<ClassEntity> | null
        } catch (error) {
            appLogger.error('os-core:Error get row mongoose', error)
            throw new AppError('os-core:Error get row mongoose', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    };
    
    public async findByPk(
        value: string,
    ): Promise<Entity<ClassEntity> | null> {
        try {
            let query = this.model.findById(value)
            
            const res = await query?.lean()
            if (!res) {
                return null
            }
            
            return res as unknown as Entity<ClassEntity> | null
            
        } catch (error) {
            appLogger.error('os-core:Error get row by key mongoose', error)
            throw new AppError('os-core:Error get row by key mongoose', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    };
    
    public async findAll<
        ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined,
    >(
        findOptions: NoSqlRepositoryFindAllOptions<
            ClassEntity,
            ReturnAttributes
        >,
    ): Promise<
        NoSqlRow<
            ClassEntity,
            ReturnAttributes
        >[]
    > {
        try {
            let query = this.model?.find()
            
            if (findOptions?.clientWhere || findOptions?.where) {
                query = query.find(
                    this.dbConnectionNoSqlFiltersBuilder.buildWhere(
                        findOptions?.where,
                        findOptions?.clientWhere,
                    ),
                )
            }
            
            if (findOptions?.order) {
                query = query.sort(this.dbConnectionNoSqlFiltersBuilder.buildOrders(findOptions.order) as any)
            }
            
            if (findOptions?.offset) {
                query = query.skip(findOptions.offset)
            }
            
            if (findOptions?.limit) {
                query = query.limit(findOptions.limit)
            }
            
            if (findOptions?.attributes && findOptions?.attributes?.length >= 1) {
                query = query?.select(findOptions.attributes as string[])
            }
            
            const res = await query?.lean()
            
            if (!res?.length) {
                return []
            }
            
            
            return res as unknown as NoSqlRow<
                ClassEntity,
                ReturnAttributes
            >[]
        } catch (error) {
            appLogger.error('os-core:Error get rows mongoose', error)
            throw new AppError('os-core:Error get rows mongoose', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    };
    
    public async pagination<
        ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined,
    >(
        params: PaginationQueryParams<Entity<ClassEntity>>,
        paginationOptions?: NoSqlRepositoryPaginationOptions<
            ClassEntity,
            ReturnAttributes
        >,
    ): Promise<
        PaginationValues<
            NoSqlRow<
                ClassEntity,
                ReturnAttributes
            >
        >
    > {
        if (params?.per_page === 0) {
            try {
                const rows = await this.findAll({
                    clientWhere: params.where,
                    order: params.order,
                    attributes: paginationOptions?.attributes,
                    where: paginationOptions?.where,
                })
                return {
                    page: 1,
                    all_pages: 1,
                    per_page: rows.length,
                    all_rows: rows.length,
                    rows: (rows || []) as any,
                }
            } catch (error) {
                appLogger.error('os-core:Error pagination', error)
                throw new AppError('os-core:Error pagination', {
                    errorKey: 'SERVER_SIDE_ERROR',
                })
            }
        }
        try {
            const countAllRows = await this.count({
                clientWhere: params.where,
                where: paginationOptions?.where,
            })
            
            if (!countAllRows) {
                return {
                    page: 1,
                    all_pages: 1,
                    per_page: 0,
                    all_rows: 0,
                    rows: [],
                }
            }
            
            const perPage = params?.per_page || 10
            const page = params?.page || 1
            
            const rows = await this.findAll({
                offset: (Number(page) - 1) * Number(perPage),
                limit: perPage,
                clientWhere: params?.where,
                order: params?.order,
                where: paginationOptions?.where,
                attributes: paginationOptions?.attributes,
            })
            return {
                page,
                all_pages: Math.ceil(countAllRows / Number(perPage)),
                per_page: perPage,
                all_rows: countAllRows,
                rows: (rows || []) as any,
                
            }
        } catch (error) {
            appLogger.error('os-core:Error mongoose pagination', error)
            throw new AppError('os-core:Error mongoose pagination', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }
    
    
    public async dropCollection(): Promise<void> {
        await this.model.collection.drop()
    }
    
    
    public getConfig(): {
        database: string
        host: string
        port: string
        dbType: 'mongodb'
        tableName: string
    } {
        const optionsDb = DbConnectionNoSqlHelper.getDbOptions(this.optionsDb)
        return {
            database: this.databaseName || '',
            host: optionsDb?.host || '',
            port: optionsDb?.port?.toString() || '0',
            dbType: 'mongodb',
            tableName: this.collectionName,
        }
    }
}
