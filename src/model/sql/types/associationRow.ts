import {OrderParams, WhereParams} from '@params'
import {SqlFilters, RowWithBaseFieldsModelSql, SqlAssociation} from '@model/core'

export type SqlAssociationRow<
    Includes extends Record<string, SqlAssociation<any>> = {},
    Key extends keyof Includes = keyof Includes
> = {
    modelKey: Key,
    require?: boolean
    where?: WhereParams<RowWithBaseFieldsModelSql<
        Includes[Key]['_row']
    >>
    filters?: SqlFilters<RowWithBaseFieldsModelSql<
        Includes[Key]['_row']
    >>
    order?: OrderParams<Includes[Key]['_row']>
}
