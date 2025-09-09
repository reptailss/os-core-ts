import React from 'react';
import Box from '@mui/material/Box';
import {sx} from './sx'
import BankSyncParsingTypes from "@packages/bankSync/containers/bankParsingTypes/BankSyncParsingTypes";

const BankSyncParsingTypesPage = () => {
    return (
        <Box
            sx={sx.root}
        >
            <BankSyncParsingTypes/>
        </Box>
    );
};

export default BankSyncParsingTypesPage;