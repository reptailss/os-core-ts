import {IDbConnectionSql} from '@db'
import {Sequelize} from 'sequelize'

import {
    SqlAggregate,
    SqlAssociation,
    SqlAssociationRow,
    SqlIndexes,
    SqlRepositoryFindAllOptions,
    SqlRepositoryFindOptions,
    SqlRepositoryPaginationOptions,
    SqlRow,
} from '@repository/core'
import {DbConnectionSqlColumnsHelper, DbConnectionSqlQueryBuilder} from '@db/core'
import {ISqlRepository} from '@repository'
import {PaginationQueryParams, PaginationValues} from '@pagination'
import {appLogger} from '@logger'
import {AppError} from '@appError'
import {CreateEntity, Entity, EntityClass, UpdateEntity} from '@entity'

type ModelSequelize<T extends object = any, A extends object = any> = any

export class SqlRepository<
    ClassEntity extends object,
    Includes extends Record<string, SqlAssociation<any>> = {},
> implements ISqlRepository<ClassEntity> {
    private readonly dbConnection: Sequelize
    private readonly model: ModelSequelize<any>
    private extraData: Record<string, string> = {}
    private _includes: Includes
    private readonly dbConnectionSqlQueryBuilder: DbConnectionSqlQueryBuilder<ClassEntity>
    
    public _entity!: Entity<ClassEntity>
    
    constructor(
        dbConnection: IDbConnectionSql,
        private readonly tableName: string,
        classEntity: ClassEntity,
        indexes?: SqlIndexes<
            Entity<ClassEntity>
        >,
        includes?: Includes,
    ) {
        const entity: EntityClass = classEntity as EntityClass
        const sequelize = dbConnection.sequelize
        this.dbConnection = sequelize
        this.model = sequelize.define(
            tableName,
            DbConnectionSqlColumnsHelper.transformEntityColumnsToSequelize(entity._columns,
                sequelize.getDialect(),
                {
                    primaryKey: entity._primaryKey,
                    dateAdd: entity._dateAdd,
                    dateUpdate: entity._dateUpdate,
                }),
            {
                freezeTableName: true,
                timestamps: true,
                createdAt: entity._dateAdd === null ? false : entity._dateAdd,
                updatedAt: entity._dateUpdate === null ? false : entity._dateUpdate,
                indexes: DbConnectionSqlColumnsHelper.transformIndexesToSequelize(indexes),
            })
        this.dbConnectionSqlQueryBuilder = new DbConnectionSqlQueryBuilder<ClassEntity>(sequelize, includes)
        this._includes = includes || {} as Includes
    }
    
    public async create(
        createEntity: CreateEntity<ClassEntity>,
    ): Promise<Entity<ClassEntity>> {
        try {
            return await this.createRow(createEntity)
        } catch (error) {
            appLogger.error('os-core:Error create row sequelize', error)
            throw new AppError('os-core:Error create row sequelize', {
                errorKey: 'CREATE_ROW_ERROR',
            })
        }
    }
    
    public async createMany(
        createEntities: CreateEntity<ClassEntity>[],
    ): Promise<number> {
        try {
            const res = await this.model.bulkCreate(createEntities, {
                validate: true,
                returning: false,
            })
            
            return res.length
        } catch (error) {
            appLogger.error('os-core:Error bulk create sequelize', error)
            throw new AppError('os-core:Error bulk create sequelize', {
                errorKey: 'CREATE_ROW_ERROR',
            })
        }
    }
    
    private async createRow(
        createEntity: CreateEntity<ClassEntity>,
    ): Promise<Entity<ClassEntity>> {
        const created = await this.model.create(createEntity)
        await created.reload()
        return created.get({plain: true})
    }
    
    
    public async update<HasReturning extends boolean = false>(
        updateEntity: UpdateEntity<ClassEntity>,
        findOptions: SqlRepositoryFindOptions<ClassEntity>,
        hasReturning?: HasReturning,
    ): Promise<HasReturning extends true ? Entity<ClassEntity> : undefined> {
        let res = null
        try {
            res = await this.model.update(updateEntity,
                {
                    where: this.dbConnectionSqlQueryBuilder.buildWhere(
                        findOptions?.where,
                        findOptions?.clientWhere,
                    ),
                    limit: 1,
                },
            )
        } catch (error) {
            appLogger.error('os-core:Error update row sequelize', error)
            throw new AppError('os-core:Error update row sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            })
        }
        if (!res) {
            throw new AppError('os-core:Error update row sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            })
        }
        if (!hasReturning) {
            return undefined as HasReturning extends true ? Entity<ClassEntity> : undefined
        }
        const newRow = await this.findOne({
            clientWhere: findOptions?.clientWhere,
            where: findOptions?.where,
        })
        if (!newRow) {
            throw new AppError('os-core:Error getting row after update sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            })
        }
        return newRow as HasReturning extends true ? Entity<ClassEntity> : undefined
        
    }
    
    public async updateMany(
        updateEntity: UpdateEntity<ClassEntity>,
        findOptions: SqlRepositoryFindOptions<ClassEntity>,
    ): Promise<number> {
        try {
            const res = await this.model.update(updateEntity,
                {
                    where: this.dbConnectionSqlQueryBuilder.buildWhere(
                        findOptions?.where,
                        findOptions?.clientWhere,
                    ),
                },
            )
            return res[0] as number
        } catch (error) {
            appLogger.error('os-core:Error update row sequelize', error)
            throw new AppError('os-core:Error update row sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            })
        }
    }
    
    public async destroy(
        findOptions: SqlRepositoryFindOptions<ClassEntity>,
    ): Promise<number> {
        try {
            return await this.model.destroy({
                where: this.dbConnectionSqlQueryBuilder.buildWhere(
                    findOptions.where,
                    findOptions.clientWhere,
                ),
                limit: 1,
            })
        } catch (error) {
            appLogger.error('os-core:Error delete row sequelize', error)
            throw new AppError('os-core:Error delete row sequelize', {
                errorKey: 'DELETE_ROW_ERROR',
            })
        }
    }
    
    public async destroyMany(
        findOptions: SqlRepositoryFindOptions<ClassEntity>,
    ): Promise<number> {
        try {
            return await this.model.destroy({
                where: this.dbConnectionSqlQueryBuilder.buildWhere(
                    findOptions.where,
                    findOptions.clientWhere,
                ),
            })
        } catch (error) {
            appLogger.error('os-core:Error delete row sequelize', error)
            throw new AppError('os-core:Error delete row sequelize', {
                errorKey: 'DELETE_ROW_ERROR',
            })
        }
    }
    
    public async count<
        Incl extends Array<SqlAssociationRow<Includes>> = [],
    >(
        findOptions: SqlRepositoryFindOptions<ClassEntity, Includes, Incl>,
    ): Promise<number> {
        try {
            const raw = this.dbConnectionSqlQueryBuilder.getRawOption(findOptions?.include as any)
            const res = await this.model.count({
                where: this.dbConnectionSqlQueryBuilder.buildWhere(
                    findOptions?.where,
                    findOptions?.clientWhere,
                ),
                raw,
                include: this.dbConnectionSqlQueryBuilder.getIncludes(findOptions?.include as any),
            })
            
            if (!res) {
                return 0
            }
            if (Array.isArray(res)) {
                return res.length
            }
            
            return res
        } catch (error) {
            appLogger.error('os-core:Error get counts sequelize', error)
            throw new AppError('os-core:Error get counts sequelize', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }
    
    public async findOne(
        findOptions: SqlRepositoryFindOptions<ClassEntity>,
    ): Promise<Entity<ClassEntity> | null> {
        try {
            const res = await this.model.findOne({
                where: this.dbConnectionSqlQueryBuilder.buildWhere(
                    findOptions?.where,
                    findOptions?.clientWhere,
                ),
                raw: true,
            })
            
            if (!res) {
                return null
            }
            
            return res as any
        } catch (error) {
            appLogger.error('os-core:Error get row sequelize', error)
            throw new AppError('os-core:Error get row sequelize', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }
    
    public async findByPk(value: number): Promise<Entity<ClassEntity> | null> {
        
        try {
            const res = await this.model.findByPk(value, {
                raw: true,
            })
            if (!res) {
                return null as unknown as Entity<ClassEntity> | null
            }
            
            return res as any
        } catch (error) {
            appLogger.error('os-core:Error get row sequelize', error)
            throw new AppError('os-core:Error get row sequelize', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }
    
    public async findAll<
        ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined,
        Incl extends Array<SqlAssociationRow<Includes>> = [],
        Aggregates extends Record<string, SqlAggregate<Entity<ClassEntity>>> = {}
    >(
        findOptions: SqlRepositoryFindAllOptions<
            ClassEntity,
            ReturnAttributes,
            Includes,
            Incl,
            Aggregates
        >,
    ): Promise<
        SqlRow<
            ClassEntity,
            Includes,
            ReturnAttributes,
            Incl,
            Aggregates
        >[]
    > {
        try {
            const raw = this.dbConnectionSqlQueryBuilder.getRawOption(findOptions?.include as any)
            
            const res = await this.model.findAll({
                where: this.dbConnectionSqlQueryBuilder.buildWhere(
                    findOptions?.where,
                    findOptions?.clientWhere,
                ),
                order: this.dbConnectionSqlQueryBuilder.buildOrder(
                    findOptions?.order,
                ),
                limit: findOptions?.limit,
                offset: findOptions?.offset,
                raw,
                attributes: this.dbConnectionSqlQueryBuilder.buildAttributes(
                    findOptions?.attributes,
                    findOptions?.aggregates,
                ),
                include: this.dbConnectionSqlQueryBuilder.getIncludes(findOptions?.include as any),
                nest: true,
                group: findOptions?.group as string[],
                
            })
            
            if (!res?.length) {
                return [] as any
            }
            return res as any
        } catch (error) {
            appLogger.error('os-core:Error get rows sequelize', error)
            throw new AppError('os-core:Error get rows sequelize', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }
    
    public async pagination<
        ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined,
        Incl extends Array<SqlAssociationRow<Includes>> = [],
        Aggregates extends Record<string, SqlAggregate<Entity<ClassEntity>>> = {}
    >(
        params: PaginationQueryParams<Entity<ClassEntity>>,
        paginationOptions?: SqlRepositoryPaginationOptions<
            ClassEntity,
            ReturnAttributes,
            Includes,
            Incl,
            Aggregates
        >,
    ): Promise<
        PaginationValues<
            SqlRow<
                ClassEntity,
                Includes,
                ReturnAttributes,
                Incl,
                Aggregates
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
                    include: paginationOptions?.include,
                    aggregates: paginationOptions?.aggregates,
                    group: paginationOptions?.group,
                })
                return {
                    page: 1,
                    all_pages: 1,
                    per_page: rows.length,
                    all_rows: rows.length,
                    rows: (rows || []) as any,
                }
            } catch (error) {
                appLogger.error('os-core:Error sequelize pagination', error)
                throw new AppError('os-core:Error sequelize pagination', {
                    errorKey: 'SERVER_SIDE_ERROR',
                })
            }
        }
        try {
            const countAllRows = await this.count({
                clientWhere: params.where,
                where: paginationOptions?.where,
                include: paginationOptions?.include,
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
                group: paginationOptions?.group,
                aggregates: paginationOptions?.aggregates,
                include: paginationOptions?.include,
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
            appLogger.error('os-core:Error sequelize pagination', error)
            throw new AppError('os-core:Error sequelize pagination', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }
    
    public async query<Row extends object>(
        value: string,
        options?: {
            replacements?: Record<string, string | number | string[] | number[] | undefined>
        }): Promise<Row[]> {
        try {
            const res = await this.dbConnection.query(value, options)
            if (!res?.length) {
                return []
            }
            return res[0] as Row[]
        } catch (error) {
            appLogger.error('os-core:Error query sequelize', error)
            throw new AppError('os-core:Error query sequelize', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }
    
    
    public getConfig(): {
        database: string;
        host: string
        port: string
        dbType: 'mysql'
        tableName: string
    } {
        const config = this.dbConnection.config
        return {
            database: config.database,
            host: config.host || '',
            port: config.port?.toString() || '0',
            dbType: 'mysql',
            tableName: this.tableName,
        }
    }
    
    public hasOne(model: ISqlRepository<object>, options: {
        foreignKey: string
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE'
    }) {
        this.model.hasOne(model._getRawModel(), options)
        
        return this
    }
    
    public hasMany(model: ISqlRepository<object>, options: {
        foreignKey: string
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE'
    }) {
        this.model.hasMany(model._getRawModel(), options)
        return this
    }
    
    public belongsTo(model: ISqlRepository<object>, options: {
        foreignKey: string
    }) {
        this.model.belongsTo(model._getRawModel(), options)
        return this
    }
    
    public getExtraData(key: string): string | null {
        if (!(key in this.extraData)) {
            return null
        }
        return this.extraData[key]
    }
    
    public saveExtraData(key: string, value: string): this {
        this.extraData[key] = value
        return this
    }
    
    
    public async syncRepository(): Promise<void> {
        await this.model.sync()
    }
    
    public _getRawModel(): ModelSequelize<any> {
        return this.model
    }
    
    public getIncludes(): Includes {
        return this._includes
    }
    
    
}