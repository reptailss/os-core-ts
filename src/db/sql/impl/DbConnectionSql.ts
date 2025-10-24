import {Sequelize} from 'sequelize'
import {DbConnectionSqlConfig, IDbConnectionSql, ISqlAssociationModel} from '@db'
import {AppError} from '@appError'
import {DbConnectionSqlColumnsHelper} from '@db/core'
import {appLogger} from '@logger'
import {EntityColumn} from '@entity'
import {SqlAssociation} from '@repository/core'


export class DbConnectionSql implements IDbConnectionSql {
    public cashedKey: string
    public sequelize: Sequelize
    private associationModels: Record<string, ISqlAssociationModel<any>> = {}
    
    
    constructor(dbOptions: DbConnectionSqlConfig | {
        storage: string
        dialect: 'sqlite'
        logging: boolean
    }) {
        if ('storage' in dbOptions) {
            this.sequelize = new Sequelize({
                dialect: dbOptions.dialect,
                logging: false,
                storage: dbOptions?.storage,
            })
            this.cashedKey = 'in-memory'
        } else {
            this.sequelize = new Sequelize(dbOptions.dbDatabase, dbOptions.dbUsername, dbOptions.dbPassword, {
                dialect: dbOptions.dialect,
                host: dbOptions.host,
                port: dbOptions.port,
                timezone: dbOptions.timezone,
                logging: false,
                dialectOptions: {
                    charset: dbOptions.charset,
                },
                storage: dbOptions?.storage,
            })
            this.cashedKey = dbOptions.dbDatabase
        }
        
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
    
    public async syncRepositories(): Promise<void> {
        this.addAssociations()
        await this.sequelize.sync()
        
    }
    
    public async close(): Promise<void> {
        await this.sequelize.close()
    }
    
    public async tableExists(tableName: string): Promise<boolean> {
        return this.getQueryInterface().tableExists(tableName)
    }
    
    public async getColumnsTable<Entity extends object>(tableName: string): Promise<
        Record<keyof Entity, EntityColumn>
    > {
        const columns = await this.getQueryInterface().describeTable(tableName)
        
        const newColumns: Record<keyof Entity, EntityColumn> = {} as Record<keyof Entity, EntityColumn>
        for (const columnName in columns) {
            const column = columns[columnName]
            newColumns[columnName as keyof Entity] = DbConnectionSqlColumnsHelper.transformDescribeSequelizeColumnToEntity(column)
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
        column: EntityColumn,
    ): Promise<void> {
        await this.getQueryInterface().addColumn(
            tableName,
            columnName,
            DbConnectionSqlColumnsHelper.entityColumnToSequelizeColumn(column, this.sequelize.getDialect()),
        )
    }
    
    public async removeColumn(tableName: string, columnName: string): Promise<void> {
        await this.getQueryInterface().removeColumn(tableName, columnName)
    }
    
    public async changeColumn(tableName: string, columnName: string, column: EntityColumn): Promise<void> {
        
        await this.getQueryInterface().changeColumn(
            tableName,
            columnName,
            DbConnectionSqlColumnsHelper.entityColumnToSequelizeColumn(column, this.sequelize.getDialect()),
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
    
    public async createTable<Entity extends object>(
        tableName: string,
        columns: Record<keyof Entity, EntityColumn>,
    ): Promise<void> {
        await this.getQueryInterface().createTable(
            tableName,
            DbConnectionSqlColumnsHelper.transformEntityColumnsToSequelize(columns, this.sequelize.getDialect()),
        )
    }
    
    public addModelForAssociation(tableName: string, associationModel: ISqlAssociationModel<any>) {
        this.associationModels[tableName] = associationModel
        return this
    }
    
    private addAssociations() {
        for (const tableName in this.associationModels) {
            const repository = this.associationModels[tableName]
            const includes = repository.getIncludes()
            if (!includes) {
                continue
            }
            for (const key in includes) {
                const associationIncludeSql: SqlAssociation<any> = repository.getIncludes()[key]
                
                const referenceModel = this.associationModels[associationIncludeSql.tableName]
                if (!referenceModel) {
                    continue
                }
                switch (associationIncludeSql.type) {
                    case 'hasOne': {
                        repository.hasOne(referenceModel, {
                            foreignKey: associationIncludeSql.referenceColumnKey as string,
                            as: key,
                            onDelete: associationIncludeSql.onDelete || 'RESTRICT',
                        })
                        break
                    }
                    case 'hasMany': {
                        repository.hasMany(referenceModel, {
                            foreignKey: associationIncludeSql.referenceColumnKey as string,
                            as: key,
                            onDelete: associationIncludeSql.onDelete || 'RESTRICT',
                        })
                        break
                    }
                    case 'belongsTo': {
                        repository.belongsTo(referenceModel, {
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
