import React from 'react';
import SelectCustom from "@ui/select/selectCustom/SelectCustom";
import {GROUP_TYPES} from "@containers/groups/select/selectGroupType/constants";
import {GroupType} from "@containers/groups/types";

interface Props {
    value: GroupType
    onChange: (value: GroupType) => void
}

const SelectGroupType = ({value, onChange}: Props) => {


    return (
        <SelectCustom
            <GroupType>
            data={GROUP_TYPES}
            value={value}
            onChange={onChange as (value: string) => void}
            label={'Тип групування'}
        />
    );
};

export default SelectGroupType;