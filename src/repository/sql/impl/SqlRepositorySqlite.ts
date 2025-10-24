import {IDbConnectionSql} from '@db'

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
import {ISqlRepository, SqlRepository} from '@repository'
import {PaginationQueryParams, PaginationValues} from '@pagination'
import {CreateEntity, Entity, EntityClass, EntityColumn, UpdateEntity} from '@entity'


export class SqlRepositorySqlite<
    ClassEntity extends object,
    Includes extends Record<string, SqlAssociation<any>> = {},
> extends SqlRepository<ClassEntity, Includes> implements ISqlRepository<ClassEntity> {
    
    private _columns: Record<string, EntityColumn>
    
    constructor(
        dbConnection: IDbConnectionSql,
        tableName: string,
        classEntity: ClassEntity,
        indexes?: SqlIndexes<
            Entity<ClassEntity>
        >,
        includes?: Includes,
    ) {
        super(dbConnection, tableName, classEntity, indexes, includes)
        const entity: EntityClass = classEntity as EntityClass
        this._columns = {
            ...entity._columns,
        }
        if (entity._primaryKey) {
            this._columns[entity._primaryKey] = {
                type: 'PRIMARY_KEY',
            }
        }
        if (entity._dateAdd) {
            this._columns[entity._dateAdd] = {
                type: 'DATETIME',
            }
        }
        if (entity._dateUpdate) {
            this._columns[entity._dateUpdate] = {
                type: 'DATETIME',
            }
        }
        
    }
    
    public async create(
        createEntity: CreateEntity<ClassEntity>,
    ): Promise<Entity<ClassEntity>> {
        const entity = await super.create(this.serializeRow(createEntity))
        return this.parseRow(entity)
    }
    
    public async update<HasReturning extends boolean = false>(
        updateEntity: UpdateEntity<ClassEntity>,
        findOptions: SqlRepositoryFindOptions<ClassEntity>,
        hasReturning?: HasReturning,
    ): Promise<HasReturning extends true ? Entity<ClassEntity> : undefined> {
        const entity = await super.update(this.serializeRow(updateEntity), findOptions, hasReturning)
        
        if (entity) {
            return this.parseRow(entity)
        }
        return entity
    }
    
    public async updateMany(updateEntity: UpdateEntity<ClassEntity>, findOptions: SqlRepositoryFindOptions<ClassEntity>): Promise<number> {
        return super.updateMany(this.serializeRow(updateEntity), findOptions)
    }
    
    
    public async findOne(
        findOptions: SqlRepositoryFindOptions<ClassEntity>,
    ): Promise<Entity<ClassEntity> | null> {
        const entity = await super.findOne(findOptions)
        if (!entity) {
            return null
        }
        return this.parseRow(entity)
    }
    
    public async findByPk(value: number): Promise<Entity<ClassEntity> | null> {
        const entity = await super.findByPk(value)
        if (!entity) {
            return null
        }
        return this.parseRow(entity)
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
        const entities = await super.findAll(findOptions)
        return entities.map((row) => this.parseRow(row))
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
        const pagination = await super.pagination(params, paginationOptions)
        return {
            page: pagination.page,
            all_pages: pagination.all_pages,
            all_rows: pagination.all_rows,
            rows: pagination.rows.map((row) => this.parseRow(row)),
            per_page: pagination.per_page,
        }
        
    }
    
    private parseRow<T>(row: T): T {
        const res: T = {} as T
        for (const key in row) {
            const value = row[key]
            const column = this._columns[key]
            if (!column) {
                res[key] = value
                continue
            }
            if (column.type === 'JSON' && typeof value === 'string') {
                try {
                    res[key] = JSON.parse(value as any)
                } catch (error) {
                    res[key] = null as any
                }
                continue
            }
            
            if (column.type === 'DATETIME') {
                if (column.allowNull && value === null) {
                    res[key] = value
                    continue
                }
                res[key] = new Date(value as any) as any
                continue
            }
            res[key] = value
        }
        return res
    }
    
    private serializeRow<T>(row: T) {
        const res: T = {} as T
        for (const key in row) {
            const value = row[key]
            const column = this._columns[key]
            if (!column) {
                res[key] = value
                continue
            }
            
            if (column.type === 'DATETIME') {
                if (value === null && column.allowNull) {
                    res[key] = value
                    continue
                }
                res[key] = new Date(value as unknown as Date).toISOString() as any
                continue
            }
            res[key] = value
        }
        return res
    }
}