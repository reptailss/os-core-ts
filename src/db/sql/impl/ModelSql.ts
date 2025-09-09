import {AppError} from '@appError'
import {DbConnectionModelSqlColumnsHelper, DbConnectionSqlModelQueryBuilder} from '@db/core'

import {ModelSqlColumns, IModelSql, SettingsLoadModelSql} from '@model'
import {
    SqlAggregate,
    SqlAssociation,
    SqlAssociationRow,
    ConfigModelSql,
    CreateAttrRowModelSql,
    FindOptionUpdateManyRowModelSql,
    FindOptionUpdateRowModelSql,
    OptionsPaginationModelSql,
    PropsCountModelSql,
    PropsDeleteRowModelSql,
    PropsFindAllModelSql,
    PropsFindByPkModelSql,
    PropsFindOneModelSql,
    ResultFindAllModelSql,
    ResultFindByPkModelSql,
    ResultFindOneModelSql,
    RowWithAggregatesModelSql,
    RowWithBaseFieldsAndAttributesModelSql,
    RowWithBaseFieldsModelSql,
    RowWithIncludeModelSql, SqlIndexes,
} from '@model/core'
import {PaginationQueryParams, PaginationValues} from '@pagination'
import {Model, ModelStatic, Sequelize} from 'sequelize'
import {appLogger} from '@logger'


type ModelSequelize<T extends object = any, A extends object = any> = ModelStatic<Model<T, A>>

export class ModelSql<
    Row extends object,
    Includes extends Record<string, SqlAssociation<any>> = {},
    RowPrimaryKey extends string = 'id',
    RowDateAddKey extends (string | null) = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update'
> implements IModelSql<
    Row,
    Includes,
    RowPrimaryKey,
    RowDateAddKey,
    RowDateUpdateKey
> {

    public readonly _row!: Row
    private _includes: Includes
    private readonly columns: ModelSqlColumns<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >
    private readonly dbConnectionSqlModelQueryBuilder: DbConnectionSqlModelQueryBuilder<
        Row,
        Includes
    >
    private readonly model: ModelSequelize<Row>
    private readonly dbConnection: Sequelize
    private readonly tableName: string
    private readonly settings?: SettingsLoadModelSql<
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >

    private extraData: Record<string, string> = {}

    constructor(
        dbConnection: Sequelize,
        tableName: string,
        columns: ModelSqlColumns<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >,
        options?: SettingsLoadModelSql<
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >,
        includes?: Includes,
        indexes?:SqlIndexes<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >
    ) {
        this._includes = includes || {} as Includes
        this.dbConnectionSqlModelQueryBuilder = new DbConnectionSqlModelQueryBuilder<
            Row,
            Includes
        >(
            dbConnection,
            includes,
        )
        this.columns = columns
        if (options) {
            this.settings = options
        }

        this.model = dbConnection.define(
            tableName,
            DbConnectionModelSqlColumnsHelper.transformBaseColumnToSequelize(columns, options),
            {
                freezeTableName: true,
                timestamps: true,
                createdAt: typeof options?.dateAdd === 'undefined' ? 'date_update' : options?.dateAdd === null ? false : options?.dateAdd,
                updatedAt: typeof options?.dateUpdate === 'undefined' ? 'date_update' : options?.dateUpdate === null ? false : options?.dateUpdate,
                indexes:DbConnectionModelSqlColumnsHelper.transformIndexesToSequelize(indexes),
            })

        this.dbConnection = dbConnection
        this.tableName = tableName
    }

    public getIncludes(): Includes {
        return this._includes
    }

    public getColumns(): ModelSqlColumns<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    > {
        return this.columns
    }

    public async create(
        row: CreateAttrRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >,
    ): Promise<RowWithBaseFieldsModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >> {
        try {
            return await this.createRow(row) as RowWithBaseFieldsModelSql<
                Row,
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
        } catch (error) {
            appLogger.error('os-core:Error create row sequelize', error)
            throw new AppError('os-core:Error create row sequelize', {
                errorKey: 'CREATE_ROW_ERROR',
            })
        }
    };

    private async createRow(row: CreateAttrRowModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >): Promise<Row> {
        const created = await this.model.create(row as any)
        await created.reload()
        return created.get({plain: true})
    }

    public async update(
        row: Partial<Row>,
        options: FindOptionUpdateRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            true
        >,
    ): Promise<RowWithBaseFieldsModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >>
    public async update(
        row: Partial<Row>,
        options: FindOptionUpdateRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            false
        >,
    ): Promise<void>
    public async update<
        HasReturning extends boolean = false
    >(
        row: Partial<Row>,
        options: FindOptionUpdateRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            HasReturning
        >,
    ): Promise<RowWithBaseFieldsModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    > | void> {
        let res = null
        try {
            res = await this.model.update(row as any as Row,
                {
                    where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                        where: options?.where,
                        filters: options?.filters,
                    }),
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
        if (!options?.returning) {
            return
        }

        const newRow = await this.findOne({
            where: options?.where,
            filters: options?.filters,
        })
        if (!newRow) {
            throw new AppError('os-core:Error getting row after update sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            })
        }
        return newRow
    };


    public async updateMany(
        row: Partial<Row>,
        options: FindOptionUpdateManyRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            true
        >,
    ): Promise<RowWithBaseFieldsModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >[]>;
    public async updateMany(
        row: Partial<Row>,
        options: FindOptionUpdateManyRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            false
        >,
    ): Promise<number>;

    public async updateMany<
        HasReturning extends boolean = false
    >(
        row: Partial<Row>,
        options: FindOptionUpdateManyRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            HasReturning
        >,
    ): Promise<RowWithBaseFieldsModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >[] | number> {
        if (!options.returning) {
            try {
                const res = await this.model.update(row,
                    {
                        where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                            where: options?.where,
                            filters: options?.filters,
                        }),
                    },
                )
                return res[0]
            } catch (error) {
                appLogger.error('os-core:Error update row sequelize', error)
                throw new AppError('os-core:Error update row sequelize', {
                    errorKey: 'UPDATE_ROW_ERROR',
                })
            }
        }

        try {
            const res = await this.model.update(row,
                {
                    where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                        where: options?.where,
                        filters: options?.filters as any,
                    }),
                    returning: true,
                },
            )
            if (res?.length < 2) {
                return []
            }
            return res[1] as any
        } catch (error) {
            appLogger.error('os-core:Error update row sequelize', error)
            throw new AppError('os-core:Error update row sequelize', {
                errorKey: 'UPDATE_ROW_ERROR',
            })
        }
    };

    public async destroy(
        props: PropsDeleteRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >,
    ): Promise<number> {
        let res = null
        try {
            res = await this.model.destroy({
                where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                    where: props?.where,
                    filters: props?.filters,
                }),
            })
        } catch (error) {
            appLogger.error('os-core:Error delete row sequelize', error)
            throw new AppError('os-core:Error delete row sequelize', {
                errorKey: 'DELETE_ROW_ERROR',
            })
        }

        if (!res) {
            throw new AppError('os-core:Error delete row sequeliz', {
                errorKey: 'DELETE_ROW_ERROR',
            })
        }
        return res
    };

    public async findAll<
        ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >> | undefined = undefined,
        Incl extends Array<SqlAssociationRow<Includes>> = [],
        Aggregates extends Record<string, SqlAggregate<Row>> = {}
    >(
        option?: PropsFindAllModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes,
            Includes,
            Incl,
            Aggregates
        >,
    ):
        Promise<ResultFindAllModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes,
            Includes,
            Incl,
            Aggregates
        >> {
        try {
            const raw = this.dbConnectionSqlModelQueryBuilder.getRawOption(option?.include)

            const res = await this.model.findAll({
                where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                    where: option?.where,
                    filters: option?.filters,
                }),
                order: this.dbConnectionSqlModelQueryBuilder.buildOrder<Aggregates>({
                    order: option?.order,
                    include: option?.include,
                    orderAggregate: option?.orderAggregate,
                }),
                limit: option?.limit,
                offset: option?.offset,
                raw,
                attributes: this.dbConnectionSqlModelQueryBuilder.buildAttributes({
                    attributes: option?.attributes as string[],
                    aggregates: option?.aggregates,
                }),
                include: this.dbConnectionSqlModelQueryBuilder.getIncludes(option?.include),
                nest: true,
                group: option?.group as string[],
            })

            if (!res?.length) {
                return []
            }
            if (!raw) {
                return res.map((row) => row.toJSON())
            }

            return res as any
        } catch (error) {
            appLogger.error('os-core:Error get rows sequelize', error)
            return []
        }
    }


    public async count<Incl extends Array<SqlAssociationRow<Includes>> = [], >(
        option?: PropsCountModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            Includes,
            Incl
        >,
    ): Promise<number> {
        try {
            const res = await this.model.count({
                where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                    where: option?.where,
                    filters: option?.filters,
                }),
                include: this.dbConnectionSqlModelQueryBuilder.getIncludes(option?.include),
                group: option?.group as string[],
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
            return 0
        }
    };

    public async findOne<
        ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >> | undefined = undefined,
        Aggregates extends Record<string, SqlAggregate<Row>> = {}
    >(
        option: PropsFindOneModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes,
            Aggregates
        >,
    ): Promise<ResultFindOneModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey,
        ReturnAttributes,
        Aggregates
    >> {
        try {
            const res = await this.model.findOne({
                where: this.dbConnectionSqlModelQueryBuilder.buildWhere({
                    where: option?.where,
                    filters: option?.filters,
                }),
                raw: true,
                attributes: this.dbConnectionSqlModelQueryBuilder.buildAttributes({
                    attributes: option?.attributes as string[],
                    aggregates: option?.aggregates,
                }),
            })

            if (!res) {
                return null
            }

            return res as any
        } catch (error) {
            appLogger.error('os-core:Error get row sequelize', error)
            return null
        }
    };

    public async findByPk<
        ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >> | undefined = undefined>(
        key: number | string,
        option?: PropsFindByPkModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes
        >,
    ): Promise<ResultFindByPkModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey,
        ReturnAttributes
    >> {
        try {
            const res = await this.model.findByPk(key, {
                attributes: option?.attributes as any,
                raw: true,
            })
            if (!res) {
                return null
            }

            return res as any
        } catch (error) {
            appLogger.error('os-core:Error get row by key sequelize', error)
            return null
        }
    };

    public async pagination<
        ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >> | undefined = undefined,
        Incl extends Array<SqlAssociationRow<Includes>> = [],
        Aggregates extends Record<string, SqlAggregate<Row>> = {}
    >(
        params?: PaginationQueryParams<RowWithBaseFieldsModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >>,
        options?: OptionsPaginationModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes,
            Includes,
            Incl,
            Aggregates
        >,
    ): Promise<PaginationValues<
        RowWithAggregatesModelSql<
            RowWithIncludeModelSql<
                RowWithBaseFieldsAndAttributesModelSql<
                    Row,
                    RowPrimaryKey,
                    RowDateAddKey,
                    RowDateUpdateKey,
                    ReturnAttributes
                >, Pick<Includes, Incl[number]['modelKey']>
            >,
            Aggregates
        >
    >> {
        if (params?.per_page === 0) {
            try {
                const rows = await this.findAll({
                    where: params?.where,
                    order: params?.order,
                    attributes: options?.attributes,
                    filters: options?.filters,
                    include: options?.include,
                    aggregates: options?.aggregates,
                    group: options?.group,
                })
                const countAllRows = rows.length
                return {
                    page: 1,
                    all_pages: 1,
                    per_page: countAllRows,
                    all_rows: rows.length,
                    rows: (rows || []) as any,
                }
            } catch (error) {
                appLogger.error('os-core:Error paginationTypes by api sql', error)
                return this.buildEmptyPagination()
            }
        }
        try {
            const countAllRows = await this.count({
                where: params?.where,
                filters: options?.filters,
                include: options?.include,
                group: options?.group,
            })

            if (!countAllRows) {
                return this.buildEmptyPagination()
            }

            const perPage = params?.per_page || 10
            const page = params?.page || 1
            const offset = (Number(page) - 1) * Number(perPage)

            const rows = await this.findAll({
                offset: offset,
                limit: perPage,
                where: params?.where,
                order: params?.order,
                attributes: options?.attributes,
                filters: options?.filters,
                include: options?.include,
                aggregates: options?.aggregates,
                group: options?.group,

            })
            return {
                page,
                all_pages: Math.ceil(countAllRows / Number(perPage)),
                per_page: perPage,
                all_rows: countAllRows,
                rows: (rows || []) as any,

            }
        } catch (error) {
            appLogger.error('os-core:Error paginationTypes by api sql', error)
            return this.buildEmptyPagination()
        }
    };

    public getConfig(): ConfigModelSql {
        const config = this.dbConnection.config
        return {
            database: config.database,
            host: config.host || '',
            port: config.port?.toString() || '0',
            dbType: 'mysql',
            tableName: this.tableName,
        }
    }

    public _getRawModel(): ModelSequelize<Row> {
        return this.model
    }


    public hasOne(model: ModelSql<object>, options: {
        foreignKey: string
        onDelete?:'RESTRICT' | 'SET_NULL' | 'CASCADE'
    }) {
        this.model.hasOne(model._getRawModel(), options)

        return this
    }

    public hasMany(model: ModelSql<object>, options: {
        foreignKey: string
        onDelete?:'RESTRICT' | 'SET_NULL' | 'CASCADE'
    }) {
        this.model.hasMany(model._getRawModel(), options)
        return this
    }

    public belongsTo(model: ModelSql<object>, options: {
        foreignKey: string
    }) {
        this.model.belongsTo(model._getRawModel(), options)
        return this
    }

    public async query<T>(value: string, options?: {
        replacements?: Record<string, string | number>
    }): Promise<T[]> {
        const res = await this.dbConnection.query(value, options)
        if (!res?.length) {
            return []
        }
        return res[0] as T[]
    }

    public async syncModel() {
        await this.model.sync()
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


    private buildEmptyPagination() {
        return {
            page: 1,
            all_pages: 1,
            per_page: 0,
            all_rows: 0,
            rows: [],
        }
    }
}

