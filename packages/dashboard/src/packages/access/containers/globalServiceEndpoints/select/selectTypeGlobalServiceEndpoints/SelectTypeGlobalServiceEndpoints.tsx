import React from 'react';
import SelectSearch from "@ui/select/selectSearch/SelectSearch";
import {GlobalServiceEndpointsType} from "@packages/access/containers/globalServiceEndpoints/types";


const TYPES: {
    value: GlobalServiceEndpointsType,
    label: string,
}[] = [
    {
        value: 'plugin',
        label: 'Плагін'
    },
    {
        value: 'default',
        label: 'Стандарнтний'
    },
]

interface Props {
    value: GlobalServiceEndpointsType | ''
    onChange: (value: GlobalServiceEndpointsType | '') => void
}

const SelectTypeGlobalServiceEndpoints = ({
                                              value,
                                              onChange,
                                          }: Props) => {

    const handleChange = (value: string) => {
        if (!value) {
            onChange('')
            return
        }
        onChange(value as GlobalServiceEndpointsType)
    }

    return (
        <SelectSearch
            data={TYPES}
            value={value}
            onChange={handleChange}
            label={'Тип'}
            width={'200px'}
        />
    );
};

export default SelectTypeGlobalServiceEndpoints;