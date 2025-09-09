import React from 'react';
import SelectCustom from "@ui/select/selectCustom/SelectCustom";
import {
    ACTION_LOG_DB_TYPES
} from "@packages/actionsLogger/containers/actionsLogs/select/selectActionLogDbType/constants";


const ACTIONS_LOGS_DB_TYPES_WITH_ALL_VARIANT = [
    {
        value: '0',
        label: 'Всі'
    },
    ...ACTION_LOG_DB_TYPES,
]

interface Props {
    value: string
    onChange: (value: string) => void
}

const SelectActionLogDbType = ({
                                   value,
                                   onChange,
                               }: Props) => {

    const handleChange = (value: string) => {
        if (value === '0') {
            onChange('')
            return
        }
        onChange(value)
    }

    return (
        <SelectCustom
            data={ACTIONS_LOGS_DB_TYPES_WITH_ALL_VARIANT}
            value={value || '0'}
            onChange={handleChange}
            label={'Тип бд'}

        />
    );
};

export default SelectActionLogDbType;