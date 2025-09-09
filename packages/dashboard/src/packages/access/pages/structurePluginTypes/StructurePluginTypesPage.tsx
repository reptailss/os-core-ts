import React from 'react';
import Box from '@mui/material/Box';
import {sx} from './sx'
import StructurePluginTypes from "@packages/access/containers/structurePluginTypes/StructurePluginTypes";

const StructurePluginTypesPage = () => {
    return (
        <Box
            sx={sx.root}
        >
            <StructurePluginTypes/>
        </Box>
    );
};

export default StructurePluginTypesPage;