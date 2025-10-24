import React from 'react';
import {GetSystemStatusRequest} from "@packages/systemStatus/containers/requests/types/events";
import {RequestsListState} from "@containers/requests/requestsState/types";
import SystemStatusSidebarRequestList
    from "@packages/systemStatus/containers/requests/sidebar/SystemStatusSidebarRequestList";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {SystemEndpoint} from "@packages/systemStatus/containers/endpoints/types";

interface Props {
    getRequests: GetSystemStatusRequest,
    requestsListState: RequestsListState,
    systemEndpoints: SystemEndpoint[],
}

const SidebarSystemStatusRequestsCharts = ({
                                               getRequests,
                                               requestsListState,
                                               systemEndpoints,
                                           }: Props) => {
    return (
        <Stack
            gap={1}
        >
            <SystemStatusSidebarRequestList
                getRequests={getRequests}
                requestsListState={requestsListState}
                systemEndpoints={systemEndpoints}
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