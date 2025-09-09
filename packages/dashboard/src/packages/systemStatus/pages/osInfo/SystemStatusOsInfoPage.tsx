import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import OsInfoView from "@containers/osInfo/OsInfoView";
import {useGetSystemStatusOsInfo} from "@packages/systemStatus/containers/osInfo/hooks/useGetOsInfo";


const SystemStatusOsInfoPage = () => {

    const {
        osInfo,
        isLoading,
        refetch
    } = useGetSystemStatusOsInfo()

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

export default SystemStatusOsInfoPage;
