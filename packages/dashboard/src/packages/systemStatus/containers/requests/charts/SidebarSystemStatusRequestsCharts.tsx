import React from 'react';
import {GetSystemStatusRequest} from "@packages/systemStatus/containers/requests/types/events";
import {RequestsListState} from "@containers/requests/requestsState/types";
import SystemStatusSidebarRequestList
    from "@packages/systemStatus/containers/requests/sidebar/SystemStatusSidebarRequestList";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

interface Props {
    getRequests: GetSystemStatusRequest,
    requestsListState: RequestsListState,
}

const SidebarSystemStatusRequestsCharts = ({
                                               getRequests,
                                               requestsListState,
                                           }: Props) => {
    return (
        <Stack
            gap={1}
        >
            <SystemStatusSidebarRequestList
                getRequests={getRequests}
                requestsListState={requestsListState}
            />

            <Divider
                sx={{
                    paddingBottom: '15px'
                }}
            >
                Налаштування графіку
            </Divider>
        </Stack>
    );
};

export default SidebarSystemStatusRequestsCharts;