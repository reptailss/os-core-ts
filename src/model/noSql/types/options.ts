export type SettingsLoadModelNoSql<
    DateAddKey extends (string | null) = 'date_add',
    DateUpdateKey extends (string | null) = 'date_update'> = {
    dateAdd?: DateAddKey,
    dateUpdate?: DateUpdateKey,
}

