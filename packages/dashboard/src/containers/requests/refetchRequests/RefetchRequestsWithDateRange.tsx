import React from 'react'
import DatePickerRangeSidebar from '@ui/date/datePickerRange/DatePickerRangeSidebar'
import {OnSaveDatePickerRangeCB} from '@ui/date/datePickerRange/types'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import {SxStyle} from '@baseTypes/sx'
import {SetStateFn} from "@baseTypes/state";

interface Props {
    sx?: SxStyle,
    dateStart: string
    dateEnd: string
    setDateStart: SetStateFn<string>
    setDateEnd: SetStateFn<string>
    refetchRequests: (props: {
        dateStart: string,
        dateEnd: string,
    }) => Promise<void>
}

const RefetchRequests = ({
                             sx: sxProps = {},
                             dateEnd,
                             dateStart,
                             setDateStart,
                             setDateEnd,
                             refetchRequests,
                         }: Props) => {
    const onSave: OnSaveDatePickerRangeCB = async ({
                                                       dateStart,
                                                       dateEnd,
                                                   }) => {
        setDateStart(dateStart)
        setDateEnd(dateEnd)
        await refetchRequests({
            dateStart,
            dateEnd,
        })
    }

    const onRefetch = async () => {
        await refetchRequests({
            dateStart,
            dateEnd,
        })
    }
    return (
        <Stack
            direction={'row'}
            sx={{
                padding: {
                    xs: '4px 10px',
                    lg: '0',
                },
                ...sxProps,
            }}
            gap={1}
        >
            <DatePickerRangeSidebar
                initialDateStart={dateStart}
                initialDateEnd={dateEnd}
                onSave={onSave}
                format={'DD/MM/YYYY'}
            />
            <IconButton
                onClick={onRefetch}
            >
                <RefreshIcon/>
            </IconButton>
        </Stack>
    )
}

export default RefetchRequests
