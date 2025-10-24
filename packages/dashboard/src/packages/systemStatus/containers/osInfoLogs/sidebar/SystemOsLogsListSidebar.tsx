import React, {useEffect} from 'react';
import {Stack} from "@mui/material";
import DatePickerRangeSidebar from "@ui/date/datePickerRange/DatePickerRangeSidebar";
import {sx} from './sx'
import Button from "@mui/material/Button";
import {GetSystemOsLogs} from "@packages/systemStatus/containers/osInfoLogs/types/getLogs";
import {SystemOsLogsListState} from "@packages/systemStatus/containers/osInfoLogs/systemStatusOsLogsListState/types";
import SelectSystemStatusServices from "@packages/systemStatus/containers/services/select/SelectSystemStatusServices";

interface Props {
    getSystemOsInfoLogs: GetSystemOsLogs,
    systemOsLogsListState: SystemOsLogsListState,
    direction?: 'row' | 'column',
    selectWith?: string | number
}

const SystemOsLogsListSidebar = ({
                                     getSystemOsInfoLogs,
                                     systemOsLogsListState,
                                     direction,
                                     selectWith
                                 }: Props) => {


    const onSaveDate = async ({
                                  dateStart,
                                  dateEnd,
                              }: {
        dateStart: Date,
        dateEnd: Date
    }) => {
        systemOsLogsListState.setDateStart(dateStart)
        systemOsLogsListState.setDateEnd(dateEnd)
        systemOsLogsListState.setPage(1)
    }

    const onFetchSystemOsInfoLogs = async () => {
        await getSystemOsInfoLogs({
            dateStart: systemOsLogsListState.dateStart,
            dateEnd: systemOsLogsListState.dateEnd,
            page: systemOsLogsListState.page,
            perPage: systemOsLogsListState.perPage,
            order: systemOsLogsListState.order,
            orderBy: systemOsLogsListState.orderBy,
            serviceKeys: systemOsLogsListState.serviceKeys
        })
    }

    function onChangeWithResetPage<Value>(value: Value, cb: (value: Value) => void) {
        cb(value)
        systemOsLogsListState.setPage(1)
    }
    
    return (
        <Stack
            direction={direction || 'row'}
            gap={2}
            alignItems={'center'}
            flexWrap={'wrap'}
            sx={sx.root}
        >
            <DatePickerRangeSidebar
                initialDateStart={systemOsLogsListState.dateStart}
                initialDateEnd={systemOsLogsListState.dateEnd}
                onSave={onSaveDate}
            />

            <SelectSystemStatusServices
                width={selectWith}
                value={systemOsLogsListState.serviceKeys}
                onChange={(value) => onChangeWithResetPage(value, systemOsLogsListState.setServiceKeys)}
            />

            <Button
                onClick={onFetchSystemOsInfoLogs}
                variant={'contained'}
                sx={sx.btn}
                fullWidth
            >
                Пошук
            </Button>
        </Stack>
    );
};

export default SystemOsLogsListSidebar;

