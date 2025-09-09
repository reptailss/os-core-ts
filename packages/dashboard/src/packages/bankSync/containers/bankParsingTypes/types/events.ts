import {
    BankSyncParsingType,
    BodyAddBankSyncParsingType,
    BodyUpdateBankSyncParsingType
} from "@packages/bankSync/containers/bankParsingTypes/types/index";

export type OnReadBtnClickBankSyncParsingType = (bankSyncParsingType: BankSyncParsingType) => Promise<void>
export type OnDeleteBtnClickBankSyncParsingType = (bankSyncParsingType: BankSyncParsingType) => Promise<void>
export type OnSaveBankSyncParsingType = (
    body: BodyAddBankSyncParsingType | BodyUpdateBankSyncParsingType
) => Promise<void>