import { ModelSqlColumn, ModelSqlColumns } from "../../../../model";
import { IDbConnectionSql } from "../../..";
import { SqIndex } from "../../../../model/core";
export interface ISqlMigrations {
    renameColumn(oldColumnName: string, newColumnName: string): Promise<void>;
    updateColumn(columnName: string, column: ModelSqlColumn<unknown, unknown>): Promise<void>;
    removeColumns(columns: string[]): Promise<void>;
    addColumns(columns: ModelSqlColumns<any>): Promise<void>;
    getColumns<Row extends object>(): Promise<ModelSqlColumns<Row>>;
    getTableName(): string;
    addAssociationHasMany<ReferenceRow extends object>(props: {
        tableName: string;
        referenceColumnKey: keyof ReferenceRow;
        onDelete?: 'RESTRICT' | 'SET NULL' | 'CASCADE';
        referencedColumnPrimaryKey?: string;
    }): Promise<void>;
    addAssociationHasOne<ReferenceRow extends object>(props: {
        tableName: string;
        referenceColumnKey: keyof ReferenceRow;
        onDelete?: 'RESTRICT' | 'SET NULL' | 'CASCADE';
        referencedColumnPrimaryKey?: string;
    }): Promise<void>;
    addAssociationBelongsTo<ReferenceRow extends object>(props: {
        tableName: string;
        referenceColumnKey: keyof ReferenceRow;
        referencedColumnPrimaryKey?: string;
    }): Promise<void>;
    addIndex<Row extends object>(index: SqIndex<Row>): Promise<void>;
    deleteIndex(indexName: string): Promise<void>;
}
export interface ISqlMigrationTask {
    runMigrations(): Promise<void>;
}
export interface ISqlMigrationTaskFactory {
    new (sqlMigrations: ISqlMigrations, dbConnection: IDbConnectionSql): ISqlMigrationTask;
}
