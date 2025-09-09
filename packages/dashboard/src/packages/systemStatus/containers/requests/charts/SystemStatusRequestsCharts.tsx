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

const SystemStatusRequestsCharts = () => {

    const requestsListState = useGetRequestsListState()

    const {
        requests,
        getRequests,
        isLoading
    } = useGetSystemStatusRequests()

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
                />}
                disableStickyBtn
            />
        </Stack>
    );
};

export default SystemStatusRequestsCharts;