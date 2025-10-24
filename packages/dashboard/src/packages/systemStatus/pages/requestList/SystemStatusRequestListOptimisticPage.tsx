import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import {
    SystemStatusRequestOptimisticList
} from "@packages/systemStatus/containers/requests/optimisticList/SystemStatusRequestOptimisticList";


const SystemStatusRequestListOptimisticPage = () => {
	
	
	return (
		<Stack
			sx={sx.root}
		>
			<SystemStatusRequestOptimisticList/>
		</Stack>
	);
};

export default SystemStatusRequestListOptimisticPage;
