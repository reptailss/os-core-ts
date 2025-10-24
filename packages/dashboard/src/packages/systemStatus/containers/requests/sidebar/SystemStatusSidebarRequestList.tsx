import React, {useCallback} from 'react';
import {Stack} from "@mui/material";
import DatePickerRangeSidebar from "@ui/date/datePickerRange/DatePickerRangeSidebar";
import {sx} from './sx'
import SystemStatusEndpointsTree from "@packages/systemStatus/containers/endpoints/SystemStatusEndpointsTree";
import Button from "@mui/material/Button";
import SelectStatusCodes from '@containers/requests/select/selectStatusCodes/SelectStatusCodes';
import SelectErrorCodes from "@containers/requests/select/selectErrorCodes/SelectErrorCodes";
import SelectErrorStatus from "@containers/requests/select/selectErrorStatus/SelectErrorStatus";
import {GetSystemStatusRequest} from "@packages/systemStatus/containers/requests/types/events";
import {RequestsListState} from "@containers/requests/requestsState/types";
import {SystemEndpoint} from "@packages/systemStatus/containers/endpoints/types";
import WhereEditorSystemStatusRequests
	from "@packages/systemStatus/containers/requests/sidebar/whereEditor/WhereEditorSystemStatusRequests";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

interface Props {
	getRequests: GetSystemStatusRequest,
	requestsListState: RequestsListState,
	systemEndpoints: SystemEndpoint[],
}

const SystemStatusSidebarRequestList = ({
											getRequests,
											requestsListState,
											systemEndpoints,
										}: Props) => {
	
	
	const onSaveDate = async ({
								  dateStart,
								  dateEnd,
							  }: {
		dateStart: Date,
		dateEnd: Date
	}) => {
		requestsListState.setDateStart(dateStart)
		requestsListState.setDateEnd(dateEnd)
		requestsListState.setPage(1)
	}
	
	const onFetchRequests = async () => {
		await getRequests({
			dateStart: requestsListState.dateStart,
			dateEnd: requestsListState.dateEnd,
			statusCodes: requestsListState.statusCodes,
			targetEndpoints: requestsListState.targetEndpoints,
			errorCodes: requestsListState.errorCodes,
			errorStatus: requestsListState.errorStatus,
			page: requestsListState.page,
			perPage: requestsListState.perPage,
			order: requestsListState.order,
			orderBy: requestsListState.orderBy,
			where: requestsListState.where,
		})
	}
	
	function onChangeWithResetPage<Value>(value: Value, cb: (value: Value) => void) {
		cb(value)
		requestsListState.setPage(1)
	}
	
	const resetPage = useCallback(() => {
		requestsListState.setPage(1)
	}, [])
	console.log(requestsListState,'requestsListState')
	
	return (
		<Stack
			direction={'column'}
			gap={2}
			sx={sx.root}
		>
			<DatePickerRangeSidebar
				initialDateStart={requestsListState.dateStart}
				initialDateEnd={requestsListState.dateEnd}
				onSave={onSaveDate}
			/>
			
			<SelectStatusCodes
				value={requestsListState.statusCodes}
				onChange={(value) => onChangeWithResetPage(value, requestsListState.setStatusCodes)}
			/>
			
			<SelectErrorCodes
				value={requestsListState.errorCodes}
				onChange={(value) => onChangeWithResetPage(value, requestsListState.setErrorCodes)}
			/>
			
			<SelectErrorStatus
				value={requestsListState.errorStatus}
				onChange={(value) => onChangeWithResetPage(value, requestsListState.setErrorStatus)}
			/>
			
			<SystemStatusEndpointsTree
				targetEndpoints={requestsListState.targetEndpoints}
				setTargetEndpoints={requestsListState.setTargetEndpoints}
				onChangeEndpoints={resetPage}
				systemEndpoints={systemEndpoints}
			/>
			
			
			<Typography>
				Where(Натисність пробіл для відображення полів)
			</Typography>
			
			
			<WhereEditorSystemStatusRequests
				value={requestsListState.where}
				onChange={(value) => onChangeWithResetPage(value, requestsListState.setWhere)}
			/>
			
			<Paper
				sx={sx.btnInner}
			>
				<Button
					onClick={onFetchRequests}
					variant={'contained'}
					
					fullWidth
				>
					Пошук
				</Button>
			</Paper>
		</Stack>
	);
};

export default SystemStatusSidebarRequestList;

