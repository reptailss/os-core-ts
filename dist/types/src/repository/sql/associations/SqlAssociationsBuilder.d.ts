import { SqlAssociationBelongsTo, SqlAssociationHasMany, SqlAssociationHasOne } from "../../core";
export declare class SqlAssociationsBuilder {
    static belongsTo<ReferenceEntity extends object, RootRow extends object>({ tableName, referenceColumnKey, }: {
        tableName: string;
        referenceColumnKey: keyof RootRow;
    }): SqlAssociationBelongsTo<ReferenceEntity, RootRow>;
    static hasMany<ReferenceEntity extends object>({ tableName, referenceColumnKey, onDelete, }: {
        tableName: string;
        referenceColumnKey: keyof ReferenceEntity;
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
    }): SqlAssociationHasMany<ReferenceEntity>;
    static hasOne<ReferenceEntity extends object>({ tableName, referenceColumnKey, onDelete, }: {
        tableName: string;
        referenceColumnKey: keyof ReferenceEntity;
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
    }): SqlAssociationHasOne<ReferenceEntity>;
}
