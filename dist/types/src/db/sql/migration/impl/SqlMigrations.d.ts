import { IDbConnectionSql, ISqlMigrations } from "../../..";
import { ModelSqlColumn, ModelSqlColumns } from "../../../../model";
import { SqIndex } from "../../../../model/core";
export declare class SqlMigrations implements ISqlMigrations {
    private readonly dbConnection;
    private readonly tableName;
    constructor(dbConnection: IDbConnectionSql, tableName: string);
    renameColumn(oldColumnName: string, newColumnName: string): Promise<void>;
    addColumns<Row extends object>(columns: ModelSqlColumns<Row>): Promise<void>;
    removeColumns<Row extends object>(columns: (keyof Row)[]): Promise<void>;
    updateColumn(columnName: string, column: ModelSqlColumn<unknown, unknown>): Promise<void>;
    getColumns<Row extends object>(): Promise<ModelSqlColumns<Row>>;
    getTableName(): string;
    deleteAssociation({ tableName, referenceColumnKey, }: {
        tableName: string;
        referenceColumnKey: string;
    }): Promise<void>;
    addAssociationBelongsTo<ReferenceRow extends object>({ tableName: referencedTable, referenceColumnKey, referencedColumnPrimaryKey, }: {
        tableName: string;
        referenceColumnKey: keyof ReferenceRow;
        referencedColumnPrimaryKey?: string;
    }): Promise<void>;
    addAssociationHasOne<ReferenceRow extends object>({ tableName: referencedTable, referenceColumnKey, onDelete, referencedColumnPrimaryKey, }: {
        tableName: string;
        referenceColumnKey: keyof ReferenceRow;
        onDelete?: 'RESTRICT' | 'SET NULL' | 'CASCADE';
        referencedColumnPrimaryKey?: string;
    }): Promise<void>;
    addAssociationHasMany<ReferenceRow extends object>({ tableName: childTable, referenceColumnKey, onDelete, referencedColumnPrimaryKey, }: {
        tableName: string;
        referenceColumnKey: keyof ReferenceRow;
        onDelete?: 'RESTRICT' | 'SET NULL' | 'CASCADE';
        referencedColumnPrimaryKey?: string;
    }): Promise<void>;
    deleteIndex(indexName: string): Promise<void>;
    addIndex<Row extends object>(index: SqIndex<Row>): Promise<void>;
    private ensureTablesExist;
}
