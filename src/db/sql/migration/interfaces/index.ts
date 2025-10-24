import {IDbConnectionSql} from '@db'
import {EntityColumn} from '@entity'
import {SqIndex} from '@repository/core'


export interface ISqlMigrations {
    renameColumn(oldColumnName: string, newColumnName: string): Promise<void>

    updateColumn(columnName: string, column: EntityColumn): Promise<void>

    removeColumns(columns: string[]): Promise<void>,

    addColumns<Entity>(columns: Record<keyof Entity, EntityColumn>): Promise<void>,

    getColumns<Entity extends object>(): Promise<Record<keyof Entity, EntityColumn>>

    getTableName(): string


    addAssociationHasMany<ReferenceEntity extends object>(props:{
        tableName: string
        referenceColumnKey: keyof ReferenceEntity
        onDelete?: 'RESTRICT' | 'SET NULL' | 'CASCADE'
        referencedColumnPrimaryNumberKey?: string
    }):Promise<void>

    addAssociationHasOne<ReferenceEntity extends object>(props:{
        tableName: string
        referenceColumnKey: keyof ReferenceEntity
        onDelete?: 'RESTRICT' | 'SET NULL' | 'CASCADE'
        referencedColumnPrimaryNumberKey?: string
    }):Promise<void>

    addAssociationBelongsTo<ReferenceEntity extends object>(props:{
        tableName: string
        referenceColumnKey: keyof ReferenceEntity
        referencedColumnPrimaryNumberKey?: string
    }):Promise<void>

    addIndex<Entity extends object>( index: SqIndex<Entity>):Promise<void>

    deleteIndex(indexName:string):Promise<void>
}


export interface ISqlMigrationTask {
    runMigrations(): Promise<void>
}


export interface ISqlMigrationTaskFactory {
    new(
        sqlMigrations: ISqlMigrations,
        dbConnection: IDbConnectionSql,
    ): ISqlMigrationTask
}