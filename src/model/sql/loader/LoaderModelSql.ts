import {IModelSql, IModelSqlDynamicRegistry, ModelSqlColumns, SettingsLoadModelSql} from '@model'
import {DbConnectionSqlFactory, DbSqlOptions, IDbConnectionSql, ISqlMigrationTaskFactory, SqlMigrations} from '@db'

import {DomainService} from '@domain'
import {AppError} from '@appError'
import {OsCoreLegalEntityService} from '@services'
import {SqlAssociation, SqlIndexes} from '@model/core'
import {appLogger} from '@logger'

const models: Record<string, IModelSql<any, any>> = {}

export class LoaderModelSql {
    static async dynamicByDatabaseName<
        Row extends object,
        RowPrimaryKey extends string = 'id',
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update',
    >(
        props: {
            databaseName: string
            columns: ModelSqlColumns<
                Row,
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
            options?: SettingsLoadModelSql<
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >,
            tableName: string
            optionsDb?: Partial<Omit<DbSqlOptions, 'dbDatabase'>>
            migrationTaskFactory?: ISqlMigrationTaskFactory
            dynamicModelRegistry?: IModelSqlDynamicRegistry<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>
            indexes?: SqlIndexes<
                Row,
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
        }): Promise<IModelSql<
        Row,
        {},
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >> {
        const key = `${props.databaseName}_${props.tableName}`

        if (key in models) {
            return models[key] as IModelSql<
                Row,
                {},
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
        }
        const dbConnection = DbConnectionSqlFactory.getDynamicByDatabaseName({
            databaseName: props.databaseName,
            optionsDb: props.optionsDb,
        })

        try {
            const model = dbConnection.defineModel(
                props.tableName,
                props.columns,
                props.options,
                {},
                props.indexes,
            )

            await model.syncModel()

            if (props.migrationTaskFactory) {
                await new props.migrationTaskFactory(
                    new SqlMigrations(dbConnection, props.tableName),
                    dbConnection,
                ).runMigrations()
            }

            if (props.dynamicModelRegistry) {
                props.dynamicModelRegistry.addModel(model)
            }
            models[key] = model

            return model
        } catch (error) {
            appLogger.error('os-core:Error get dynamic api sequelize', error)
            throw new AppError('os-core:Error get dynamic api sequelize', {
                errorKey: 'GET_MODEL_ERROR',
            })
        }
    }

    static async dynamicByDomain<
        Row extends object,
        RowPrimaryKey extends string = 'id',
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update',
    >(
        props: {
            domain: string
            columns: ModelSqlColumns<
                Row,
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
            options?: SettingsLoadModelSql<
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
            tableName: string
            optionsDb?: Partial<Omit<DbSqlOptions, 'dbDatabase'>>
            migrationTaskFactory?: ISqlMigrationTaskFactory
            dynamicModelRegistry?: IModelSqlDynamicRegistry<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>
            indexes?: SqlIndexes<
                Row,
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
        }): Promise<IModelSql<
        Row,
        {},
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >> {
        const databaseName = await DomainService.getDatabaseNameByDomain(props.domain)

        const model = await this.dynamicByDatabaseName({
            databaseName,
            tableName: props.tableName,
            options: props.options,
            columns: props.columns,
            optionsDb: props.columns,
            migrationTaskFactory: props.migrationTaskFactory,
            dynamicModelRegistry: props.dynamicModelRegistry,
            indexes: props.indexes,
        })

        model.saveExtraData('domain', props.domain)

        return model
    }

    static async dynamicDbConfigByLegalEntityId<
        Row extends object,
        RowPrimaryKey extends string = 'id',
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update',
    >(
        props: {
            legalEntityId: number
            columns: ModelSqlColumns<
                Row,
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
            options?: SettingsLoadModelSql<
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
            tableName: string
            optionsDb?: Partial<Omit<DbSqlOptions, 'dbDatabase' | 'dbUsername' | 'dbPassword' | 'host'>>
            migrationTaskFactory?: ISqlMigrationTaskFactory,
            dynamicModelRegistry?: IModelSqlDynamicRegistry<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>
            indexes?: SqlIndexes<
                Row,
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
        }): Promise<IModelSql<
        Row,
        {},
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >> {
        const {
            database,
            password,
            port,
            host,
            username,
        } = await OsCoreLegalEntityService.getDbConfigById(props.legalEntityId)

        const model = await this.dynamicByDatabaseName({
            databaseName: database,
            tableName: props.tableName,
            options: props.options,
            columns: props.columns,
            optionsDb: {
                ...(props.optionsDb || {}),
                host,
                port,
                dbPassword: password,
                dbUsername: username,
            },
            migrationTaskFactory: props.migrationTaskFactory,
            dynamicModelRegistry: props.dynamicModelRegistry,
            indexes: props.indexes,
        })
        model.saveExtraData('leId', props.legalEntityId.toString())

        return model

    }


    static staticByDbConnection<
        Row extends object,
        Includes extends Record<string, SqlAssociation<any>> = {},
        RowPrimaryKey extends string = 'id',
        RowDateAddKey extends (string | null) = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update',
    >(
        props: {
            columns: ModelSqlColumns<
                Row,
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
            options?: SettingsLoadModelSql<
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >,
            tableName: string,
            dbConnection: IDbConnectionSql
            includes?: Includes
            indexes?: SqlIndexes<
                Row,
                RowPrimaryKey,
                RowDateAddKey,
                RowDateUpdateKey
            >
        }): IModelSql<
        Row,
        Includes,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    > {
        try {
            return props.dbConnection.defineModel(
                props.tableName,
                props.columns,
                props.options,
                props.includes,
                props.indexes,
            )
        } catch (error) {
            appLogger.error('os-core:Error get static api', error)
            throw new AppError('os-core:Error get static api', {
                errorKey: 'GET_MODEL_ERROR',
            })

        }
    }
}

