import React from 'react'
import SystemOsLogsListSidebar from '@packages/systemStatus/containers/osInfoLogs/sidebar/SystemOsLogsListSidebar'
import {GetSystemOsLogs} from '@packages/systemStatus/containers/osInfoLogs/types/getLogs'
import {SystemOsLogsListState} from '@packages/systemStatus/containers/osInfoLogs/systemStatusOsLogsListState/types'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

interface Props {
	getSystemOsInfoLogs: GetSystemOsLogs,
	systemOsLogsListState: SystemOsLogsListState,
}

const SystemOsLogsListChartSidebar = ({
										  systemOsLogsListState,
										  getSystemOsInfoLogs,
									  }: Props) => {
	return (
		<Stack
			gap={1}
		>
			<SystemOsLogsListSidebar
				getSystemOsInfoLogs={getSystemOsInfoLogs}
				systemOsLogsListState={systemOsLogsListState}
				direction={'column'}
			/>
			
			<Divider
				sx={{
					paddingBottom: '15px'
				}}
			>
				Налаштування графіку
			</Divider>
		</Stack>
	)
}

export default SystemOsLogsListChartSidebar