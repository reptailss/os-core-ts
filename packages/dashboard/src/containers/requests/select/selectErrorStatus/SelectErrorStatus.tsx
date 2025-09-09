import React from 'react';
import {RequestErrorStatus} from "@containers/requests/types/errorStatus";
import SelectCustom from "@ui/select/selectCustom/SelectCustom";
import {ERROR_STATUSES} from "@containers/requests/select/selectErrorStatus/constants";


interface Props {
    value: RequestErrorStatus,
    onChange: (value: RequestErrorStatus) => void,
    width?: string | number
}

const SelectErrorStatus = ({
                               value,
                               onChange,
                               width,
                           }: Props) => {
    return (
        <SelectCustom
            value={value}
            onChange={onChange as any}
            data={ERROR_STATUSES}
            label={'Стаус помилки'}
            width={width}
        />
    );
};

export default SelectErrorStatus;