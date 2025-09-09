import React, {useCallback, useEffect} from 'react';
import {Stack} from "@mui/material";
import DatePickerRangeSidebar from "@ui/date/datePickerRange/DatePickerRangeSidebar";
import {sx} from './sx'
import SystemStatusEndpointsTree from "@packages/systemStatus/containers/endpoints/SystemStatusEndpointsTree";
import Button from "@mui/material/Button";
import SelectStatusCodes from '@containers/requests/select/selectStatusCodes/SelectStatusCodes';
import SelectErrorCodes from "@containers/requests/select/selectErrorCodes/SelectErrorCodes";
import SelectErrorStatus from "@containers/requests/select/selectErrorStatus/SelectErrorStatus";
import {GetSystemStatusRequest} from "@packages/systemStatus/containers/requests/types/events";
import {RequestsListState} from "@containers/requests/requestsState/types";

interface Props {
    getRequests: GetSystemStatusRequest,
    requestsListState: RequestsListState,
}

const SystemStatusSidebarRequestList = ({
                                            getRequests,
                                            requestsListState,
                                        }: Props) => {


    const onSaveDate = async ({
                                  dateStart,
                                  dateEnd,
                              }: {
        dateStart: string,
        dateEnd: string
    }) => {
        requestsListState.setDateStart(dateStart)
        requestsListState.setDateEnd(dateEnd)
        requestsListState.setPage(1)
    }

    const onFetchRequests = async () => {
        await getRequests({
            dateStart: requestsListState.dateStart,
            dateEnd: requestsListState.dateEnd,
            statusCodes: requestsListState.statusCodes,
            targetEndpoints: requestsListState.targetEndpoints,
            errorCodes: requestsListState.errorCodes,
            errorStatus: requestsListState.errorStatus,
            page: requestsListState.page,
            perPage: requestsListState.perPage,
            order: requestsListState.order,
            orderBy: requestsListState.orderBy,
        })
    }

    function onChangeWithResetPage<Value>(value: Value, cb: (value: Value) => void) {
        cb(value)
        requestsListState.setPage(1)
    }

    const resetPage = useCallback(() => {
        requestsListState.setPage(1)
    }, [])

    useEffect(() => {
        onFetchRequests()
    }, [])

    return (
        <Stack
            direction={'column'}
            gap={2}
            sx={sx.root}
        >
            <DatePickerRangeSidebar
                initialDateStart={requestsListState.dateStart}
                initialDateEnd={requestsListState.dateEnd}
                onSave={onSaveDate}
                format={'DD/MM/YYYY'}
            />

            <SelectStatusCodes
                value={requestsListState.statusCodes}
                onChange={(value) => onChangeWithResetPage(value, requestsListState.setStatusCodes)}
            />

            <SelectErrorCodes
                value={requestsListState.errorCodes}
                onChange={(value) => onChangeWithResetPage(value, requestsListState.setErrorCodes)}
            />

            <SelectErrorStatus
                value={requestsListState.errorStatus}
                onChange={(value) => onChangeWithResetPage(value, requestsListState.setErrorStatus)}
            />

            <SystemStatusEndpointsTree
                targetEndpoints={requestsListState.targetEndpoints}
                setTargetEndpoints={requestsListState.setTargetEndpoints}
                onChangeEndpoints={resetPage}
            />

            <Button
                onClick={onFetchRequests}
                variant={'contained'}
                sx={sx.btn}
                fullWidth
            >
                Пошук
            </Button>
        </Stack>
    );
};

export default SystemStatusSidebarRequestList;

