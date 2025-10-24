import React from 'react'
import {useGetSystemEndpoints} from '@packages/systemStatus/containers/endpoints/hooks/useGetSystemEndpoints'
import {
	useGetSystemStatusRequestsByMonth
} from '@packages/systemStatus/containers/requests/hooks/useGetSystemStatusRequestsByMonth'
import RequestsListOptimisticView from '@containers/requests/requestsList/RequestsListOptimisticView'
import Spinner from '@ui/spinner/Spinner'
import {sx} from './sx'
import SystemStatusSidebarRequestListOptimistic
	from '@packages/systemStatus/containers/requests/sidebar/SystemStatusSidebarRequestListOptimistic'
import {Box} from '@mui/material'
import {useMedia} from '@hooks/useMedia'
import Grid2 from '@mui/material/Grid2'


export const SystemStatusRequestOptimisticList = () => {
	
	const {systemEndpoints} = useGetSystemEndpoints()
	const {isDesktop} = useMedia()
	
	const {
		requests,
		isLoading,
		next,
		hasNextRows,
		getByFilters,
	} = useGetSystemStatusRequestsByMonth(systemEndpoints)
	
	return (
		<>
			{isLoading && <Spinner variant={'overlay'}/>}
			
			<Grid2
				container
				spacing={1}
				direction={!isDesktop ? 'column-reverse' : undefined}
			>
				<Grid2
					size={{
						xs: 12,
						lg: 9
					}}
				>
					<RequestsListOptimisticView
						isLoading={isLoading}
						requests={requests}
						sxTable={sx.table}
						hasNextRows={hasNextRows}
						next={next}
					/>
				</Grid2>
				
				<Grid2
					size={{
						xs: 12,
						lg: 3
					}}
				>
					<Box
						sx={sx.sidebar}
					>
						<SystemStatusSidebarRequestListOptimistic
							onSaveFilters={getByFilters}
							systemEndpoints={systemEndpoints}
						/>
					</Box>
				</Grid2>
			</Grid2>
		</>
	)
}

