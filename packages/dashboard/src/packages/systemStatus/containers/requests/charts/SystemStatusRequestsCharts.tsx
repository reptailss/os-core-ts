import React from 'react';
import CustomLineChart from "@ui/customLineChart/CustomLineChart";
import Stack from '@mui/material/Stack';
import {sx} from './sx'
import {SYSTEM_STATUS_REQUESTS_CHARTS_COLUMNS} from "@packages/systemStatus/containers/requests/charts/constants";
import {useGetRequestsListState} from "@containers/requests/requestsState/hooks/useGetRequestsListState";
import {useGetSystemStatusRequests} from "@packages/systemStatus/containers/requests/hooks/useGetSystemStatusRequests";
import Spinner from '@ui/spinner/Spinner';
import SidebarSystemStatusRequestsCharts
    from "@packages/systemStatus/containers/requests/charts/SidebarSystemStatusRequestsCharts";
import {useGetSystemEndpoints} from "@packages/systemStatus/containers/endpoints/hooks/useGetSystemEndpoints";

const SystemStatusRequestsCharts = () => {

    const requestsListState = useGetRequestsListState()
    const {systemEndpoints} = useGetSystemEndpoints()
    const {
        requests,
        getRequests,
        isLoading
    } = useGetSystemStatusRequests(systemEndpoints)

    return (
        <Stack
            sx={sx.root}
        >
            {isLoading && <Spinner variant={'overlay'}/>}

            <CustomLineChart
                data={requests}
                initialColumns={SYSTEM_STATUS_REQUESTS_CHARTS_COLUMNS}
                sidebarChildren={<SidebarSystemStatusRequestsCharts
                    getRequests={getRequests}
                    requestsListState={requestsListState}
                    systemEndpoints={systemEndpoints}
                />}
                disableStickyBtn
            />
        </Stack>
    );
};

export default SystemStatusRequestsCharts;