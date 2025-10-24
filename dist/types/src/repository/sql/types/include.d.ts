import { Entity } from "../../../entity";
export type SqlAssociation<ReferenceClassEntity extends object, RootClassEntity extends object = any> = SqlAssociationBelongsTo<ReferenceClassEntity, RootClassEntity> | SqlAssociationHasMany<ReferenceClassEntity> | SqlAssociationHasOne<ReferenceClassEntity>;
export type SqlAssociationBelongsTo<ReferenceClassEntity extends object, RootClassEntity extends object> = {
    _entity: Entity<ReferenceClassEntity>;
    tableName: string;
    type: 'belongsTo';
    referenceColumnKey: keyof RootClassEntity;
};
export type SqlAssociationHasMany<ReferenceClassEntity extends object> = {
    _entity: Entity<ReferenceClassEntity>;
    tableName: string;
    type: 'hasMany';
    referenceColumnKey: keyof ReferenceClassEntity;
    onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
};
export type SqlAssociationHasOne<ReferenceClassEntity extends object> = {
    _entity: Entity<ReferenceClassEntity>;
    tableName: string;
    type: 'hasOne';
    referenceColumnKey: keyof ReferenceClassEntity;
    onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
};
