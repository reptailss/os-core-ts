import React from 'react';
import {ActionLogType} from "@packages/actionsLogger/containers/actionsLogs/types";
import SelectCustom from "@ui/select/selectCustom/SelectCustom";
import {ACTION_LOG_TYPES} from "@packages/actionsLogger/containers/actionsLogs/select/selectActionLogType/constants";


const ACTIONS_LOGS_TYPES_WITH_ALL_VARIANT = [
    {
        value: '0',
        label: 'Всі'
    },
    ...ACTION_LOG_TYPES,
]

interface Props {
    value: ActionLogType | null
    onChange: (value: ActionLogType | null) => void
}

const SelectActionLogType = ({
                                 value,
                                 onChange,
                             }: Props) => {

    const handleChange = (value: string) => {
        if (!value || value === '0') {
            onChange(null)
            return
        }
        onChange(value as ActionLogType)
    }
    return (
        <SelectCustom
            data={ACTIONS_LOGS_TYPES_WITH_ALL_VARIANT}
            value={value || '0'}
            onChange={handleChange}
            label={'Тип дії'}

        />
    );
};

export default SelectActionLogType;