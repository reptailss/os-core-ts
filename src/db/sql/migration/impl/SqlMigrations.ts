import {AppError} from '@appError'
import {IDbConnectionSql, ISqlMigrations} from '@db'

import {ModelSqlColumn, ModelSqlColumns} from '@model'
import {appLogger} from '@logger'
import {SqIndex} from '@model/core'


export class SqlMigrations implements ISqlMigrations {

    private readonly dbConnection: IDbConnectionSql
    private readonly tableName: string

    constructor(dbConnection: IDbConnectionSql, tableName: string) {
        this.dbConnection = dbConnection
        this.tableName = tableName
    }

    public async renameColumn(oldColumnName: string, newColumnName: string): Promise<void> {
        const tableExists = await this.dbConnection.tableExists(this.tableName)

        if (!tableExists) {
            throw new AppError(`os-core:Table ${this.tableName} does not exist.`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }

        try {
            const columns = await this.dbConnection.getColumnsTable(this.tableName)

            if (
                !columns ||
                newColumnName in columns ||
                !(oldColumnName in columns)
            ) {
                throw new AppError(`Column ${newColumnName} already exists or ${oldColumnName} does not exist.`, {
                    errorKey: 'SERVER_SIDE_ERROR',
                })
            }
            await this.dbConnection.renameColumn(this.tableName, oldColumnName, newColumnName)

        } catch (error) {
            appLogger.error('os-core:Error delete dynamic column', error)
            throw new AppError('os-core:Error delete dynamic column', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }

    public async addColumns<Row extends object>(columns: ModelSqlColumns<Row>): Promise<void> {
        const tableExists = await this.dbConnection.tableExists(this.tableName)

        if (!tableExists) {
            throw new AppError(`os-core: Table ${this.tableName} does not exist.`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }

        try {

            const tableColumns = await this.dbConnection.getColumnsTable<Row>(this.tableName)

            for (const columnName in columns) {
                if (columnName in tableColumns) {
                    continue
                }

                await this.dbConnection.addColumn(this.tableName, columnName, columns[columnName as keyof ModelSqlColumns<Row>])
            }

        } catch (error) {
            appLogger.error('os-core: Error adding dynamic columns', error)
            throw new AppError('os-core: Error adding dynamic columns:', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }

    public async removeColumns<Row extends object>(columns: (keyof Row)[]): Promise<void> {
        const tableExists = await this.dbConnection.tableExists(this.tableName)

        if (!tableExists) {
            throw new AppError(`os-core:Table ${this.tableName} does not exist.`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }

        try {
            const tableColumns = await this.dbConnection.getColumnsTable<Row>(this.tableName)
            for (const columnName of columns) {
                if (!(columnName in tableColumns)) {
                    continue
                }

                await this.dbConnection.removeColumn(this.tableName, columnName as string)
            }

        } catch (error) {
            appLogger.error('os-core:Error delete dynamic column', error)
            throw new AppError('os-core:Error delete dynamic column', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }

    public async updateColumn(columnName: string, column: ModelSqlColumn<unknown, unknown>): Promise<void> {
        const tableExists = await this.dbConnection.tableExists(this.tableName)

        if (!tableExists) {
            throw new AppError(`os-core:Table ${this.tableName} does not exist.`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }

        try {
            const tableColumns = await this.dbConnection.getColumnsTable(this.tableName)

            if (!(columnName in tableColumns)) {
                return
            }
            await this.dbConnection.changeColumn(this.tableName, columnName, column)

        } catch (error) {
            appLogger.error('os-core:Error delete dynamic column', error)
            throw new AppError('os-core:Error delete dynamic column', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }

    public async getColumns<Row extends object>(): Promise<ModelSqlColumns<Row>> {
        return this.dbConnection.getColumnsTable(this.tableName)
    }

    public getTableName(): string {
        return this.tableName
    }

    public async deleteAssociation({
                                       tableName,
                                       referenceColumnKey,
                                   }: {
        tableName: string,
        referenceColumnKey: string,
    }): Promise<void> {
        const tableExists = await this.dbConnection.tableExists(tableName)

        if (!tableExists) {
            throw new AppError(`os-core: Table ${tableName} does not exist.`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }

        try {
            const results = await this.dbConnection.query<{CONSTRAINT_NAME: string}>(`
                SELECT CONSTRAINT_NAME
                FROM information_schema.KEY_COLUMN_USAGE
                WHERE TABLE_SCHEMA = DATABASE()
                  AND TABLE_NAME = :tableName
                  AND COLUMN_NAME = :referenceColumnKey
                  AND REFERENCED_TABLE_NAME IS NOT NULL LIMIT 1
            `, {
                replacements: {
                    tableName,
                    referenceColumnKey,
                },
            })

            if (!results?.length) {
                throw new AppError(`os-core: Foreign key constraint on column ${referenceColumnKey} not found in table ${tableName}`, {
                    errorKey: 'NOT_FOUND_ERROR',
                })
            }

            const constraintName = results[0].CONSTRAINT_NAME

            await this.dbConnection.query(`ALTER TABLE \`${tableName}\` DROP FOREIGN KEY \`${constraintName}\`;`)

        } catch (error) {
            appLogger.error(`os-core: Error dropping association for table ${tableName} by column ${referenceColumnKey}`, error)
            throw new AppError(`os-core: Error dropping association for table ${tableName} by column ${referenceColumnKey}`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }

    public async addAssociationBelongsTo<ReferenceRow extends object>({
                                                                          tableName: referencedTable,
                                                                          referenceColumnKey,
                                                                          referencedColumnPrimaryKey,
                                                                      }: {
        tableName: string
        referenceColumnKey: keyof ReferenceRow,
        referencedColumnPrimaryKey?: string
    }): Promise<void> {
        await this.addAssociationHasOne({tableName: referencedTable, referenceColumnKey, referencedColumnPrimaryKey})
    }

    public async addAssociationHasOne<ReferenceRow extends object>({
                                                                       tableName: referencedTable,
                                                                       referenceColumnKey,
                                                                       onDelete,
                                                                       referencedColumnPrimaryKey = 'id',
                                                                   }: {
        tableName: string
        referenceColumnKey: keyof ReferenceRow
        onDelete?: 'RESTRICT' | 'SET NULL' | 'CASCADE'
        referencedColumnPrimaryKey?: string
    }): Promise<void> {
        const columnName = referenceColumnKey as string
        const constraintName = `fk_${this.tableName}_${referencedTable}_${columnName}`

        await this.ensureTablesExist(this.tableName, referencedTable)

        const onDeleteClause = onDelete ? `ON DELETE ${onDelete}` : ''

        const query = `
            ALTER TABLE \`${this.tableName}\`
                ADD CONSTRAINT \`${constraintName}\`
                    FOREIGN KEY (\`${columnName}\`)
                        REFERENCES \`${referencedTable}\` (\`${referencedColumnPrimaryKey}\`)
                ${onDeleteClause};
        `

        try {
            await this.dbConnection.query(query)
        } catch (error) {
            appLogger.error(`os-core: Error adding has one association`, error)
            throw new AppError(`os-core: Error adding has one association`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }


    public async addAssociationHasMany<ReferenceRow extends object>({
                                                                        tableName: childTable,
                                                                        referenceColumnKey,
                                                                        onDelete,
                                                                        referencedColumnPrimaryKey = 'id',
                                                                    }: {
        tableName: string
        referenceColumnKey: keyof ReferenceRow
        onDelete?: 'RESTRICT' | 'SET NULL' | 'CASCADE'
        referencedColumnPrimaryKey?: string
    }): Promise<void> {
        const columnName = referenceColumnKey as string
        const constraintName = `fk_${childTable}_${this.tableName}_${columnName}`

        await this.ensureTablesExist(childTable, this.tableName)

        const onDeleteClause = onDelete ? `ON DELETE ${onDelete}` : ''

        const query = `
            ALTER TABLE \`${childTable}\`
                ADD CONSTRAINT \`${constraintName}\`
                    FOREIGN KEY (\`${columnName}\`)
                        REFERENCES \`${this.tableName}\` (\`${referencedColumnPrimaryKey}\`)
                ${onDeleteClause};
        `

        try {
            await this.dbConnection.query(query)
        } catch (error) {
            appLogger.error(`os-core: Error adding has many association`, error)
            throw new AppError(`os-core: Error adding has many association`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }


    public async deleteIndex(
        indexName: string,
    ): Promise<void> {
        const query = `DROP INDEX \`${indexName}\` ON \`${this.tableName}\`;`
        try {
            await this.dbConnection.query(query)
        } catch (error) {
            appLogger.error(`Error removing index ${indexName} on ${this.tableName}`, error)
            throw new AppError(`Error removing index ${indexName} on ${this.tableName}`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }

    public async addIndex<Row extends object>(
        index: SqIndex<Row>,
    ): Promise<void> {

        const indexName = index?.options?.name || `idx_${this.tableName}_${Object.keys(index.columns).join('_')}`
        const uniqueStr = index?.options?.unique ? 'UNIQUE' : ''
        const usingStr = index?.options?.using ? `USING ${index.options.using}` : ''

        const cols = Object.entries(index.columns).map(([col, opts]) => {
            let colDef = `\`${col}\``
            if (opts.length !== undefined) colDef += `(${opts.length})`
            if (opts.order !== undefined) colDef += ` ${opts.order}`
            return colDef
        }).join(', ')

        try {
            await this.dbConnection.query(`
                CREATE ${uniqueStr} INDEX \`${indexName}\` ON \`${this.tableName}\` ${usingStr} (${cols});
            `)
        } catch (error) {
            appLogger.error(`Error adding index ${indexName} on ${this.tableName}`, error)
            throw new AppError(`Error adding index ${indexName} on ${this.tableName}`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
    }


    private async ensureTablesExist(...tableNames: string[]): Promise<void> {
        for (const table of tableNames) {
            const exists = await this.dbConnection.tableExists(table)
            if (!exists) {
                throw new AppError(`os-core: Table ${table} does not exist.`, {
                    errorKey: 'SERVER_SIDE_ERROR',
                })
            }
        }
    }
}

