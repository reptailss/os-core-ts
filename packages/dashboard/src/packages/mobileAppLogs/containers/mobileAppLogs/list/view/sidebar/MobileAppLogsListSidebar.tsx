import React, {useEffect} from 'react';
import {Stack} from "@mui/material";
import DatePickerRangeSidebar from "@ui/date/datePickerRange/DatePickerRangeSidebar";
import {sx} from './sx'
import Button from "@mui/material/Button";
import {MobileAppLogsListState} from "@packages/mobileAppLogs/containers/mobileAppLogs/list/types/state";
import {GetMobileAppLogs} from "@packages/mobileAppLogs/containers/mobileAppLogs/types/events";
import Typography from "@mui/material/Typography";
import WhereEditorMobileAppLogs
	from "@packages/mobileAppLogs/containers/mobileAppLogs/list/view/whereEditor/WhereEditorMobileAppLogs";


interface Props {
	getMobileAppLogs: GetMobileAppLogs
	mobileAppLogsListState: MobileAppLogsListState
}

const MobileAppLogsListSidebar = ({
									  getMobileAppLogs,
									  mobileAppLogsListState,
								  }: Props) => {
	
	
	const onSaveDate = async ({
								  dateStart,
								  dateEnd,
							  }: {
		dateStart: string,
		dateEnd: string
	}) => {
		mobileAppLogsListState.setDateStart(dateStart)
		mobileAppLogsListState.setDateEnd(dateEnd)
		mobileAppLogsListState.setPage(1)
	}
	
	const onFetchRequests = async () => {
		await getMobileAppLogs({
			dateStart: mobileAppLogsListState.dateStart,
			dateEnd: mobileAppLogsListState.dateEnd,
			page: mobileAppLogsListState.page,
			perPage: 20,
			orderBy: mobileAppLogsListState.orderBy,
			order: mobileAppLogsListState.order,
			where: mobileAppLogsListState.where
		})
	}
	
	function onChangeWithResetPage<Value>(value: Value, cb: (value: Value) => void) {
		cb(value)
		mobileAppLogsListState.setPage(1)
	}
	
	useEffect(() => {
		onFetchRequests()
	}, [])
	
	return (
		<Stack
			direction={'column'}
			gap={2}
			sx={sx.root}
		>
			<DatePickerRangeSidebar
				initialDateStart={mobileAppLogsListState.dateStart}
				initialDateEnd={mobileAppLogsListState.dateEnd}
				onSave={onSaveDate}
				format={'DD/MM/YYYY'}
			/>
			<Typography>
				Where
			</Typography>
			
			<WhereEditorMobileAppLogs
				value={mobileAppLogsListState.where || ''}
				onChange={(value) => onChangeWithResetPage(value, mobileAppLogsListState.setWhere)}
			/>
			
			<Button
				onClick={onFetchRequests}
				variant={'contained'}
				sx={sx.btn}
				fullWidth
			>
				Пошук
			</Button>
		</Stack>
	);
};

export default MobileAppLogsListSidebar;

