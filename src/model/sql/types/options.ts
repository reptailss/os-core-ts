export type SettingsLoadModelSql<
    RowPrimaryKey extends string = 'id',
    DateAddKey extends (string | null) = 'date_add',
    DateUpdateKey extends (string | null) = 'date_update'> = {
    primaryKey?: RowPrimaryKey,
    dateAdd?: DateAddKey,
    dateUpdate?: DateUpdateKey,
}

