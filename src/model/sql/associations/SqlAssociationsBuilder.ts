import {SqlAssociationBelongsTo, SqlAssociationHasMany, SqlAssociationHasOne} from '@model/core'

export class SqlAssociationsBuilder {

    public static belongsTo<
        ReferenceRow extends object,
        RootRow extends object
    >({
          tableName,
          referenceColumnKey,
      }: {
        tableName: string
        referenceColumnKey: keyof RootRow
    }): SqlAssociationBelongsTo<ReferenceRow, RootRow> {
        return {
            tableName,
            referenceColumnKey,
            type: 'belongsTo',
        } as SqlAssociationBelongsTo<ReferenceRow, RootRow>
    }

    public static hasMany<ReferenceRow extends object>({
                                                           tableName,
                                                           referenceColumnKey,
                                                           onDelete,
                                                       }: {
        tableName: string
        referenceColumnKey: keyof ReferenceRow
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE'
    }): SqlAssociationHasMany<ReferenceRow> {
        return {
            tableName,
            referenceColumnKey,
            type: 'hasMany',
            onDelete,
        } as SqlAssociationHasMany<ReferenceRow>
    }

    public static hasOne<ReferenceRow extends object>({
                                                          tableName,
                                                          referenceColumnKey,
                                                          onDelete,
                                                      }: {
        tableName: string
        referenceColumnKey: keyof ReferenceRow
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE'
    }): SqlAssociationHasOne<ReferenceRow> {
        return {
            tableName,
            referenceColumnKey,
            type: 'hasOne',
            onDelete,
        } as SqlAssociationHasOne<ReferenceRow>
    }

}