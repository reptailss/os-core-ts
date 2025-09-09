import React from 'react';
import SelectMultiSearch from "@ui/select/selectMultiSearch/SelectMultiSearch";
import {STATUS_CODES} from "@containers/requests/select/selectStatusCodes/constants";


interface Props {
    value: string[],
    onChange: (value: string[]) => void,
    width?: string | number
}

const SelectStatusCodes = ({
                               value,
                               onChange,
                               width
                           }: Props) => {
    return (
        <SelectMultiSearch
            value={value}
            onChange={onChange}
            data={STATUS_CODES}
            label={'Статус коди'}
            width={width}
        />
    );
};

export default SelectStatusCodes;