import React from 'react';
import SelectCustom from "@ui/select/selectCustom/SelectCustom";
import {GroupType, GroupValueType} from "@containers/groups/types";
import {GROUP_VALUE_TYPES} from "@containers/groups/select/selectGroupValueType/constants";

interface Props {
    value: GroupValueType
    onChange: (value: GroupValueType) => void
}

const SelectGroupValueType = ({value, onChange}: Props) => {


    return (
        <SelectCustom
            <GroupType>
            data={GROUP_VALUE_TYPES}
            value={value}
            onChange={onChange as (value: string) => void}
        />
    );
};

export default SelectGroupValueType;