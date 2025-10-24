import React, {useCallback} from 'react';
import {useGetRequestsListState} from "@containers/requests/requestsState/hooks/useGetRequestsListState";
import RequestsListView from "@containers/requests/requestsList/RequestsListView";
import SystemStatusSidebarRequestList
	from "@packages/systemStatus/containers/requests/sidebar/SystemStatusSidebarRequestList";
import {useGetSystemStatusRequests} from "@packages/systemStatus/containers/requests/hooks/useGetSystemStatusRequests";
import Grid2 from '@mui/material/Grid2';
import {sx} from './sx'
import Spinner from "@ui/spinner/Spinner";
import {useMedia} from "@hooks/useMedia";
import {useGetSystemEndpoints} from "@packages/systemStatus/containers/endpoints/hooks/useGetSystemEndpoints";
import {ServerMeta} from "@containers/requests/types/meta";

const SystemStatusRequestsList = () => {
	
	const requestsListState = useGetRequestsListState()
	
	const {systemEndpoints} = useGetSystemEndpoints()
	
	const {
		requests,
		totalPage,
		getRequests,
		isLoading
	} = useGetSystemStatusRequests(systemEndpoints)
	
	const {isDesktop} = useMedia()
	
	const onChangePage = useCallback(async (page: number) => {
		await getRequests({
			page,
			perPage: requestsListState.perPage,
			order: requestsListState.order,
			orderBy: requestsListState.orderBy,
			where: requestsListState.where,
			dateEnd: requestsListState.dateEnd,
			statusCodes: requestsListState.statusCodes,
			targetEndpoints: requestsListState.targetEndpoints,
			errorCodes: requestsListState.errorCodes,
			errorStatus: requestsListState.errorStatus,
			dateStart: requestsListState.dateStart
		})
	}, [requestsListState])
	
	const onChangeSort = useCallback(async ({
												order,
												orderBy,
											}: {
		order: 'desc' | 'asc',
		orderBy: keyof ServerMeta
	}) => {
		await getRequests({
			page: requestsListState.page,
			perPage: requestsListState.perPage,
			order,
			orderBy,
			where: requestsListState.where,
			dateEnd: requestsListState.dateEnd,
			statusCodes: requestsListState.statusCodes,
			targetEndpoints: requestsListState.targetEndpoints,
			errorCodes: requestsListState.errorCodes,
			errorStatus: requestsListState.errorStatus,
			dateStart: requestsListState.dateStart
		})
	}, [requestsListState])
	
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
						lg: 8
					}}
				>
					<RequestsListView
						isLoading={isLoading}
						requestsListState={requestsListState}
						requests={requests}
						totalPage={totalPage}
						sxTable={sx.table}
						onChangePage={onChangePage}
						onChangeSort={onChangeSort}
					/>
				</Grid2>
				
				<Grid2
					size={{
						xs: 12,
						lg: 4
					}}
					sx={sx.sidebar}
				>
					<SystemStatusSidebarRequestList
						requestsListState={requestsListState}
						getRequests={getRequests}
						systemEndpoints={systemEndpoints}
					/>
				</Grid2>
			</Grid2>
		</>
	);
};

export default SystemStatusRequestsList;

