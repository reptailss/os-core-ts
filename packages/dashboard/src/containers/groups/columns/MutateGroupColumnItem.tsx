import React from 'react';
import {GroupColumn} from "@containers/groups/types";
import {SetStateFn} from "@baseTypes/state";
import SwitchCustom from "@ui/switch/SwitchCustom";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SelectGroupValueType from "@containers/groups/select/selectGroupValueType/SelectGroupValueType";


interface Props<
    Row extends { date: Date },
    Col extends GroupColumn<Row>
> {
    column: GroupColumn<Row>,
    setColumns: SetStateFn<Col[]>,
}

const MutateGroupColumnItem = <
    Row extends { date: Date },
    Col extends GroupColumn<Row>
>({
      column,
      setColumns,
  }: Props<Row, Col>) => {

    function handleChange<Key extends keyof GroupColumn<Row>>(
        key: Key,
        value: GroupColumn<Row>[Key]
    ) {
        setColumns((columns) => {
            return columns?.map((col) => {
                if (col.key === column.key) {
                    return {
                        ...col,
                        [key]: value
                    }
                }
                return col;
            })
        })
    }

    return (
        <Stack
            gap={1}
        >
            <Typography>
                {column.label}
            </Typography>

            <SwitchCustom
                label={'Приховати'}
                value={column.hide}
                onChange={(hilde) => handleChange('hide', hilde)}
            />
            <SelectGroupValueType
                value={column.valueType}
                onChange={(valueType) => handleChange('valueType', valueType)}
            />

            <Divider/>
        </Stack>
    );
};

export default MutateGroupColumnItem;