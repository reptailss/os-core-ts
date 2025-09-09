import React from 'react';
import {GroupColumn} from "@containers/groups/types";
import {SetStateFn} from "@baseTypes/state";
import MutateGroupColumnItem from "@containers/groups/columns/MutateGroupColumnItem";
import Stack from "@mui/material/Stack";
import {SxStyle} from "@baseTypes/sx";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const sx: SxStyle = {
    root: {
        padding: '10px 0'
    }
}

interface Props<
    Row extends { date: Date },
    Col extends GroupColumn<Row>
> {
    columns: GroupColumn<Row>[],
    setColumns: SetStateFn<Col[]>,
}

const MutateGroupColumns = <
    Row extends { date: Date },
    Col extends GroupColumn<Row>
>({
      columns,
      setColumns,
  }: Props<Row, Col>) => {

    const list = columns?.map((column) => {
        return (
            <MutateGroupColumnItem
                column={column}
                setColumns={setColumns}
                key={column.key as string}
            />
        )
    })

    const allHilde = () => {
        setColumns((prev) => {
            return prev?.map((col) => {
                return {
                    ...col,
                    hide: true
                }
            })
        })
    }

    const allShow = () => {
        setColumns((prev) => {
            return prev?.map((col) => {
                return {
                    ...col,
                    hide: false
                }
            })
        })
    }
    return (
        <Stack
            gap={2}
            sx={sx.root}
        >
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button size={'small'} onClick={allHilde}>Приховати всі</Button>
                <Button size={'small'} onClick={allShow}>Показвати всі</Button>
            </ButtonGroup>
            {list}
        </Stack>
    );
};

export default MutateGroupColumns;