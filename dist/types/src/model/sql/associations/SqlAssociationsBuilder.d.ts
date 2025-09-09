import { SqlAssociationBelongsTo, SqlAssociationHasMany, SqlAssociationHasOne } from "../../core";
export declare class SqlAssociationsBuilder {
    static belongsTo<ReferenceRow extends object, RootRow extends object>({ tableName, referenceColumnKey, }: {
        tableName: string;
        referenceColumnKey: keyof RootRow;
    }): SqlAssociationBelongsTo<ReferenceRow, RootRow>;
    static hasMany<ReferenceRow extends object>({ tableName, referenceColumnKey, onDelete, }: {
        tableName: string;
        referenceColumnKey: keyof ReferenceRow;
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
    }): SqlAssociationHasMany<ReferenceRow>;
    static hasOne<ReferenceRow extends object>({ tableName, referenceColumnKey, onDelete, }: {
        tableName: string;
        referenceColumnKey: keyof ReferenceRow;
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
    }): SqlAssociationHasOne<ReferenceRow>;
}
