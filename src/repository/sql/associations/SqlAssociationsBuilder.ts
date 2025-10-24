import {SqlAssociationBelongsTo, SqlAssociationHasMany, SqlAssociationHasOne} from '@repository/core'

export class SqlAssociationsBuilder {

    public static belongsTo<
        ReferenceEntity extends object,
        RootRow extends object
    >({
          tableName,
          referenceColumnKey,
      }: {
        tableName: string
        referenceColumnKey: keyof RootRow
    }): SqlAssociationBelongsTo<ReferenceEntity, RootRow> {
        return {
            tableName,
            referenceColumnKey,
            type: 'belongsTo',
        } as SqlAssociationBelongsTo<ReferenceEntity, RootRow>
    }

    public static hasMany<ReferenceEntity extends object>({
                                                           tableName,
                                                           referenceColumnKey,
                                                           onDelete,
                                                       }: {
        tableName: string
        referenceColumnKey: keyof ReferenceEntity
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE'
    }): SqlAssociationHasMany<ReferenceEntity> {
        return {
            tableName,
            referenceColumnKey,
            type: 'hasMany',
            onDelete,
        } as SqlAssociationHasMany<ReferenceEntity>
    }

    public static hasOne<ReferenceEntity extends object>({
                                                          tableName,
                                                          referenceColumnKey,
                                                          onDelete,
                                                      }: {
        tableName: string
        referenceColumnKey: keyof ReferenceEntity
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE'
    }): SqlAssociationHasOne<ReferenceEntity> {
        return {
            tableName,
            referenceColumnKey,
            type: 'hasOne',
            onDelete,
        } as SqlAssociationHasOne<ReferenceEntity>
    }

}