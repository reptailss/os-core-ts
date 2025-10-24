import {EntityColumn} from '@entity'

export type EntityClass = {
    _columns: Record<string, EntityColumn>
    _primaryKey: string | null
    _dateAdd: string | null
    _dateUpdate: string | null
}