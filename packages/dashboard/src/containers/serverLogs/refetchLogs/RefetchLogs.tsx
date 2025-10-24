import React, {useState} from 'react';
import DatePickerRangeSidebar from '@ui/date/datePickerRange/DatePickerRangeSidebar';
import {OnSaveDatePickerRangeCB} from "@ui/date/datePickerRange/types";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from '@mui/icons-material/Refresh';
import {getLogsInitialDate} from "@containers/serverLogs/date/getLogsInitialDate";
import {SxStyle} from "@baseTypes/sx";

const {
    initialDateStart,
    initialDateEnd,
} = getLogsInitialDate()


interface Props {
    refetch: (prop: {
        dateStart: Date,
        dateEnd: Date
    }) => Promise<void>,
    sx?: SxStyle
}

const RefetchLogs = ({refetch, sx}: Props) => {

    const [dateStart, setDateStart] = useState<Date>(initialDateStart)
    const [dateEnd, setDateEnd] = useState<Date>(initialDateEnd)

    const onSave: OnSaveDatePickerRangeCB = async ({
                                                       dateStart,
                                                       dateEnd,
                                                   }) => {
        setDateStart(dateStart)
        setDateEnd(dateEnd)
        await refetch({
            dateStart,
            dateEnd,
        })
    }

    const onRefetch = async () => {
        await refetch({
            dateStart: dateStart,
            dateEnd: dateEnd,
        })
    }
    return (
        <Stack
            direction={'row'}
            gap={1}
            sx={sx}
        >

            <DatePickerRangeSidebar
                initialDateStart={dateStart}
                initialDateEnd={dateEnd}
                onSave={onSave}
            />

            <IconButton
                onClick={onRefetch}
            >
                <RefreshIcon/>
            </IconButton>
        </Stack>
    );
};

export default RefetchLogs;
