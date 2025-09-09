import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import GlobalServiceEndpointsList
    from "@packages/access/containers/globalServiceEndpoints/list/GlobalServiceEndpointsList";


const GlobalServiceEndpointsListPage = () => {

    return (
        <Stack
            sx={sx.root}
        >
            <GlobalServiceEndpointsList/>
        </Stack>
    );
};

export default GlobalServiceEndpointsListPage;
