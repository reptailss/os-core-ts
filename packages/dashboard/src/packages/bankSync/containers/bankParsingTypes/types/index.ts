export type BankSyncParsingType = {
    id: number
    date_add: Date
    date_update: Date
    name: string
    key: string
    fields: BankSyncParsingTypeField[]
}

export type BankSyncParsingTypeField = {
    key: string
    type: BankSyncParsingTypeFieldType
    name: string
}

export type BankSyncParsingTypeFieldWithId = BankSyncParsingTypeField & { id: string }

export type BankSyncParsingTypeFieldType = 'date'


export interface BodyAddBankSyncParsingType {
    name: string
    key: string
    fields: BankSyncParsingTypeField[]
}

export interface BodyUpdateBankSyncParsingType {
    id: number
    name: string
    fields: BankSyncParsingTypeField[]
}


export interface ResponseBankSyncParsingTypes {
    rows: BankSyncParsingType[]
}