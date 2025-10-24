import { IDbConnectionSql, ISqlMigrations } from "../../..";
import { EntityColumn } from "../../../../entity";
import { SqIndex } from "../../../../repository/core";
export declare class SqlMigrations implements ISqlMigrations {
    private readonly dbConnection;
    private readonly tableName;
    constructor(dbConnection: IDbConnectionSql, tableName: string);
    renameColumn(oldColumnName: string, newColumnName: string): Promise<void>;
    addColumns<Entity extends object>(columns: Record<keyof Entity, EntityColumn>): Promise<void>;
    removeColumns<Row extends object>(columns: (keyof Row)[]): Promise<void>;
    updateColumn(columnName: string, column: EntityColumn): Promise<void>;
    getColumns<Entity extends object>(): Promise<Record<keyof Entity, EntityColumn>>;
    getTableName(): string;
    deleteAssociation({ tableName, referenceColumnKey, }: {
        tableName: string;
        referenceColumnKey: string;
    }): Promise<void>;
    addAssociationBelongsTo<ReferenceEntity extends object>({ tableName: referencedTable, referenceColumnKey, referencedColumnPrimaryNumberKey, }: {
        tableName: string;
        referenceColumnKey: keyof ReferenceEntity;
        referencedColumnPrimaryNumberKey?: string;
    }): Promise<void>;
    addAssociationHasOne<ReferenceEntity extends object>({ tableName: referencedTable, referenceColumnKey, onDelete, referencedColumnPrimaryNumberKey, }: {
        tableName: string;
        referenceColumnKey: keyof ReferenceEntity;
        onDelete?: 'RESTRICT' | 'SET NULL' | 'CASCADE';
        referencedColumnPrimaryNumberKey?: string;
    }): Promise<void>;
    addAssociationHasMany<ReferenceEntity extends object>({ tableName: childTable, referenceColumnKey, onDelete, referencedColumnPrimaryNumberKey, }: {
        tableName: string;
        referenceColumnKey: keyof ReferenceEntity;
        onDelete?: 'RESTRICT' | 'SET NULL' | 'CASCADE';
        referencedColumnPrimaryNumberKey?: string;
    }): Promise<void>;
    deleteIndex(indexName: string): Promise<void>;
    addIndex<Entity extends object>(index: SqIndex<Entity>): Promise<void>;
    private ensureTablesExist;
}
