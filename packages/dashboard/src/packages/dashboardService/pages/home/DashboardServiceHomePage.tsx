import React from 'react'
import RequestsBaseInfo from '@containers/requests/baseInfo/RequestsBaseInfo'
import Stack from '@mui/material/Stack'
import {sx} from './sx'
import ChartGroupedByEndpoints from '@containers/requests/grouped/groupedByEndpoints/ChartGroupedByEndpoints'
import Divider from '@mui/material/Divider'
import RefetchRequests from "@containers/requests/refetchRequests/RefetchRequests";
import {useRequestsContext} from "@containers/requests/context/hooks/useRequestsContext";


const DashboardServiceHomePage = () => {

    const {
        refetchRequests
    } = useRequestsContext()

    const {
        requestsGroupedByStatus,
        requestsGroupedByErrorCode,
        requestsGroupedByEndpoints,
    } = useRequestsContext()

    return (
        <Stack
            sx={sx.root}
        >
            <RefetchRequests refetchRequests={refetchRequests}/>

            <RequestsBaseInfo
                requestsGroupedByStatus={requestsGroupedByStatus}
                requestsGroupedByErrorCode={requestsGroupedByErrorCode}
            />

            <Divider
                sx={sx.divider}
            >
                Кількість та середній час(по дням)
            </Divider>

            <ChartGroupedByEndpoints
                requestsGroupedByEndpoints={requestsGroupedByEndpoints}
            />
        </Stack>
    )
}

export default DashboardServiceHomePage
