import React from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import SystemStatusRequestsList from "@packages/systemStatus/containers/requests/list/SystemStatusRequestsList";


const SystemStatusRequestListPage = () => {
	
	
	return (
		<Stack
			sx={sx.root}
		>
			<SystemStatusRequestsList/>
		</Stack>
	);
};

export default SystemStatusRequestListPage;
