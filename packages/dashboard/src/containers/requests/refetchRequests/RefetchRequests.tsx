import React from 'react'
import {useRequestsContext} from '@containers/requests/context/hooks/useRequestsContext'
import DatePickerRangeSidebar from '@ui/date/datePickerRange/DatePickerRangeSidebar'
import {OnSaveDatePickerRangeCB} from '@ui/date/datePickerRange/types'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import {SxStyle} from '@baseTypes/sx'

interface Props {
    sx?: SxStyle,
    refetchRequests: ()=>Promise<void>,
}

const RefetchRequests = ({sx: sxProps = {},refetchRequests}: Props) => {

    const onRefetch = async () => {
        await refetchRequests()
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
            <IconButton
                onClick={onRefetch}
            >
                <RefreshIcon />
            </IconButton>
        </Stack>
    )
}

export default RefetchRequests
