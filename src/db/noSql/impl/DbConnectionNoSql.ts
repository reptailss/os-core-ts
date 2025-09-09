import {ModelNoSqlColumns, IModelNoSql, NoSqlIndexes, SettingsLoadModelNoSql} from '@model'

import {DbNoSqlOptions, IDbConnectionNoSql} from '@db'
import mongoose, {Connection} from 'mongoose'
import {AppError} from '@appError'
import {DbConnectionNoSqlHelper, ModelNoSql} from '@db/core'


export class DbConnectionNoSql implements IDbConnectionNoSql {

    private dbConnectionMongoose: Connection | null = null

    private databaseName: string
    private optionsDb?: Partial<DbNoSqlOptions>

    constructor(
        databaseName: string,
        optionsDb?: Partial<DbNoSqlOptions>,
    ) {
        this.databaseName = databaseName
        if (optionsDb) {
            this.optionsDb = optionsDb
        }
    }

    public async init() {

        const newMongoose = await mongoose.connect(DbConnectionNoSqlHelper.getDbUrl(
            DbConnectionNoSqlHelper.getDbOptions(this.optionsDb),
        ))

        if (!newMongoose?.connection) {
            throw new AppError('os-core:Error get connecting mongoose database', {
                errorKey: 'CONNECT_TO_DB_ERROR',
            })
        }

        const newConnectionMongoose = newMongoose.connection.useDb(this.databaseName)

        if (!newConnectionMongoose) {
            throw new AppError('os-core:Error connecting to mongoose database', {
                errorKey: 'CONNECT_TO_DB_ERROR',
            })
        }

        this.dbConnectionMongoose = newConnectionMongoose
    }


    public defineModel<
        Row extends object,
        RowDateAddKey extends (string | null)  = 'date_add',
        RowDateUpdateKey extends (string | null) = 'date_update',
    >({
          columns,
          collectionName,
          options,
          indexes,
      }: {
        collectionName: string,
        columns: ModelNoSqlColumns<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >,
        options?: SettingsLoadModelNoSql<RowDateAddKey, RowDateUpdateKey>,
        indexes?: NoSqlIndexes<Row, RowDateAddKey, RowDateUpdateKey>
    }): IModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    > {
        if (!this.dbConnectionMongoose) {
            throw new AppError('os-core:Error connecting to mongoose database', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        return new ModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >({
            dbConnection: this.dbConnectionMongoose,
            collectionName,
            columns,
            indexes,
            options,
            databaseName: this.databaseName,
            optionsDb: this.optionsDb,
        })
    }

}