export type SqlAssociation<ReferenceRow extends object> =
    SqlAssociationBelongsTo<ReferenceRow, any>
    | SqlAssociationHasMany<ReferenceRow>
    | SqlAssociationHasOne<ReferenceRow>

export type SqlAssociationBelongsTo<
    ReferenceRow extends object,
    RootRow extends object
> = {
    _row: ReferenceRow
    tableName: string
    type: 'belongsTo'
    referenceColumnKey: keyof RootRow
}


export type SqlAssociationHasMany<ReferenceRow extends object> = {
    _row: ReferenceRow
    tableName: string
    type: 'hasMany'
    referenceColumnKey: keyof ReferenceRow
    onDelete?:'RESTRICT' | 'SET_NULL' | 'CASCADE'
}

export type SqlAssociationHasOne<ReferenceRow extends object> = {
    _row: ReferenceRow
    tableName: string
    type: 'hasOne'
    referenceColumnKey: keyof ReferenceRow
    onDelete?:'RESTRICT' | 'SET_NULL' | 'CASCADE'
}

