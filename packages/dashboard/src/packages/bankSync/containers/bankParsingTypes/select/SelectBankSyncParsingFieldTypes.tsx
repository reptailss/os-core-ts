import React from 'react';
import SelectCustom from "@ui/select/selectCustom/SelectCustom";
import {BANK_SYNC_PARSING_TYPE_FIELD_TYPES} from "@packages/bankSync/containers/bankParsingTypes/select/constants";
import {BankSyncParsingTypeFieldType} from "@packages/bankSync/containers/bankParsingTypes/types";

interface Props {
    value: BankSyncParsingTypeFieldType,
    onChange: (value: BankSyncParsingTypeFieldType) => void
}

const SelectBankSyncParsingFieldTypes = ({
                                             value,
                                             onChange
                                         }: Props) => {
    return (
        <SelectCustom
            data={BANK_SYNC_PARSING_TYPE_FIELD_TYPES}
            value={value}
            onChange={onChange as any}
            label={'Тип поля'}
        />
    );
};

export default SelectBankSyncParsingFieldTypes;