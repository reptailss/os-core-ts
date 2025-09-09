import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import ReadinessView from '@containers/readiness/ReadinessView';
import {useGetDashboardServiceReadiness} from "@packages/dashboardService/containers/readiness/hooks/useGetDashboardServiceReadiness";
import {
    useGetSystemStatusReadiness
} from "@packages/systemStatus/containers/readiness/hooks/useGetSystemStatusReadiness";


const SystemStatusReadinessPage = () => {

    const {
        readiness,
        isLoading,
        refetchReadiness,
        refetchLiveness,
        liveness
    } = useGetSystemStatusReadiness()

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

export default SystemStatusReadinessPage;
