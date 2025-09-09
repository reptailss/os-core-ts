import React from 'react';
import SelectMultiSearch from "@ui/select/selectMultiSearch/SelectMultiSearch";
import {ERROR_CODES} from "@containers/requests/select/selectErrorCodes/constants";


interface Props {
    value: string[],
    onChange: (value: string[]) => void,
    width?: string | number
}

const SelectErrorCodes = ({
                              value,
                              onChange,
    width,
                          }: Props) => {
    return (
        <SelectMultiSearch
            value={value}
            onChange={onChange}
            data={ERROR_CODES}
            label={'Коди помилок'}
            width={width}
        />
    );
};

export default SelectErrorCodes;