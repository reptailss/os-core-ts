import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import OsInfoView from "@containers/osInfo/OsInfoView";
import {useGetDashboardServiceOsInfo} from "@packages/dashboardService/containers/osInfo/hooks/useGetOsInfo";


const DashboardServiceOsInfoPage = () => {

    const {
        osInfo,
        isLoading,
        refetch
    } = useGetDashboardServiceOsInfo()

    return (
        <Stack
            sx={sx.root}
        >
            <OsInfoView
                osInfo={osInfo}
                isLoading={isLoading}
                refetch={refetch}
            />
        </Stack>
    );
};

export default DashboardServiceOsInfoPage;
