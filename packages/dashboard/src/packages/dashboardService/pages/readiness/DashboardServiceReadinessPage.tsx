import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import ReadinessView from '@containers/readiness/ReadinessView';
import {useGetDashboardServiceReadiness} from "@packages/dashboardService/containers/readiness/hooks/useGetDashboardServiceReadiness";


const DashboardServiceReadinessPage = () => {

    const {
        readiness,
        isLoading,
        refetchReadiness,
        refetchLiveness,
        liveness
    } = useGetDashboardServiceReadiness()

    return (
        <Stack
            sx={sx.root}
        >
            <ReadinessView
                readiness={readiness}
                isLoading={isLoading}
                refetchReadiness={refetchReadiness}
                refetchLiveness={refetchLiveness}
                liveness={liveness}
            />
        </Stack>
    );
};

export default DashboardServiceReadinessPage;
