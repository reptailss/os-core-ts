import React from 'react';
import {Stack} from "@mui/material";
import {RequestsListState} from "@containers/requests/requestsState/types";
import SelectStatusCodes from "@containers/requests/select/selectStatusCodes/SelectStatusCodes";
import SelectErrorCodes from "@containers/requests/select/selectErrorCodes/SelectErrorCodes";
import SelectErrorStatus from "@containers/requests/select/selectErrorStatus/SelectErrorStatus";
import RefetchRequests from "@containers/requests/refetchRequests/RefetchRequests";
import {useRequestsContext} from "@containers/requests/context/hooks/useRequestsContext";


interface Props {
    requestsListState: RequestsListState,

}

const DashboardServiceHeadSidebarRequestList = ({
                                                    requestsListState
                                                }: Props) => {

    const {refetchRequests} = useRequestsContext()


    function onChangeWithResetPage<Value>(value: Value, cb: (value: Value) => void) {
        cb(value)
        requestsListState.setPage(1)
    }

    return (
        <Stack
            direction={{
                xs: 'column',
                lg: 'row'
            }}
            gap={1.5}
        >
            <RefetchRequests
                refetchRequests={refetchRequests}
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
        </Stack>
    );
};

export default DashboardServiceHeadSidebarRequestList;