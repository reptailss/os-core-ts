import {Sequelize} from 'sequelize'
import {DbSqlOptions, IDbConnectionSql} from '@db'
import {ModelSqlColumn, ModelSqlColumns, IModelSql, SettingsLoadModelSql} from '@model'
import {SqlAssociation, SqlIndexes} from '@model/core'
import {AppError} from '@appError'
import {DbConnectionModelSqlColumnsHelper, ModelSql} from '@db/core'
import {appLogger} from '@logger'


export class DbConnectionSql implements IDbConnectionSql {
    private sequelize: Sequelize
    private modelsSql: Record<string, IModelSql<any>> = {}


    constructor(dbOptions: DbSqlOptions) {
        this.sequelize = new Sequelize(dbOptions.dbDatabase, dbOptions.dbUsername, dbOptions.dbPassword, {
            dialect: dbOptions.dialect,
            host: dbOptions.host,
            port: dbOptions.port,
            timezone: dbOptions.timezone,
            logging: false,
            dialectOptions: {
                charset: dbOptions.charset,
            },
        })
    }


    private getQueryInterface() {
        return this.sequelize.getQueryInterface()
    }

    public async query<T>(value: string, options: {
        replacements: Record<string, string | number>
    }): Promise<T[]> {
        const res = await this.sequelize.query(value, {replacements: options?.replacements})
        if (!res?.length) {
            return []
        }
        return res[0] as T[]
    }

    public async syncModels(): Promise<void> {
        this.addAssociations()
        await this.sequelize.sync()

    }

    public async close(): Promise<void> {
        await this.sequelize.close()
    }

    public defineModel<
        Row extends object,
        Includes extends Record<string, SqlAssociation<any>> = {},
        RowPrimaryKey extends string = 'id',
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update',
    >(
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
    ): IModelSql<
        Row,
        Includes,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    > {
        const model = new ModelSql<
            Row,
            Includes,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >(
            this.sequelize,
            tableName,
            columns,
            options,
            includes,
            indexes,
        )
        this.modelsSql[tableName] = model as IModelSql<any>
        return model
    }

    public async tableExists(tableName: string): Promise<boolean> {
        return this.getQueryInterface().tableExists(tableName)
    }

    public async getColumnsTable<Row extends object>(tableName: string): Promise<ModelSqlColumns<Row>> {
        const columns = await this.getQueryInterface().describeTable(tableName)

        const newColumns: ModelSqlColumns<any> = {} as ModelSqlColumns<Row>
        for (const columnName in columns) {
            const column = columns[columnName]
            newColumns[columnName] = DbConnectionModelSqlColumnsHelper.transformDescribeSequelizeColumnToBase(column)
        }

        return newColumns
    }

    public async renameColumn(
        tableName: string,
        oldName: string,
        newName: string,
    ) {
        await this.getQueryInterface().renameColumn(tableName, oldName, newName)
    }

    public async addColumn(
        tableName: string,
        columnName: string,
        column: ModelSqlColumn<any, any>,
    ): Promise<void> {
        await this.getQueryInterface().addColumn(
            tableName,
            columnName,
            DbConnectionModelSqlColumnsHelper.columnBaseToSequelizeColumn(column),
        )
    }

    public async removeColumn(tableName: string, columnName: string): Promise<void> {
        await this.getQueryInterface().removeColumn(tableName, columnName)
    }

    public async changeColumn(tableName: string, columnName: string, column: ModelSqlColumn<any, any>): Promise<void> {

        await this.getQueryInterface().changeColumn(
            tableName,
            columnName,
            DbConnectionModelSqlColumnsHelper.columnBaseToSequelizeColumn(column),
        )
    }

    public async checkConnection(): Promise<void> {
        try {
            await this.sequelize.authenticate()
        } catch (error) {
            appLogger.error('os-core: Error connection sql', error)
            throw new AppError('os-core: Error connection sql', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }

    public async dropTable(tableName: string): Promise<void> {
        const queryInterface = this.getQueryInterface()
        await queryInterface.dropTable(tableName)
    }

    public async createTable<Row extends object>(tableName: string, columns: ModelSqlColumns<Row>): Promise<void> {
        await this.getQueryInterface().createTable(
            tableName,
            DbConnectionModelSqlColumnsHelper.transformBaseColumnToSequelize(columns),
        )
    }

    private addAssociations() {
        for (const tableName in this.modelsSql) {
            const model = this.modelsSql[tableName]
            const includes = model.getIncludes()
            if (!includes) {
                continue
            }
            for (const key in includes) {
                //@ts-ignore
                const associationIncludeSql: SqlAssociation<any> = model._includes[key] as SqlAssociation<any>

                const referenceModel = this.modelsSql[associationIncludeSql.tableName]
                if (!referenceModel) {
                    continue
                }
                switch (associationIncludeSql.type) {
                    case 'hasOne': {
                        model.hasOne(referenceModel, {
                            foreignKey: associationIncludeSql.referenceColumnKey as string,
                            as: key,
                            onDelete:associationIncludeSql.onDelete || 'RESTRICT'
                        })
                        break
                    }
                    case 'hasMany': {
                        model.hasMany(referenceModel, {
                            foreignKey: associationIncludeSql.referenceColumnKey as string,
                            as: key,
                            onDelete:associationIncludeSql.onDelete || 'RESTRICT'
                        })
                        break
                    }
                    case 'belongsTo': {
                        model.belongsTo(referenceModel, {
                            foreignKey: associationIncludeSql.referenceColumnKey as string,
                            as: key,
                        })
                        break
                    }
                }
            }
        }
    }
}
