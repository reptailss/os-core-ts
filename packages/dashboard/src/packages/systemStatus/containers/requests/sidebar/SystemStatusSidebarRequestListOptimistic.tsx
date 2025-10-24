import React, {useState} from 'react';
import {Divider, Stack, TextField} from "@mui/material";
import {sx} from './sx'
import SystemStatusEndpointsTree from "@packages/systemStatus/containers/endpoints/SystemStatusEndpointsTree";
import Button from "@mui/material/Button";
import SelectErrorStatus from "@containers/requests/select/selectErrorStatus/SelectErrorStatus";
import {SystemEndpoint} from "@packages/systemStatus/containers/endpoints/types";
import {RequestErrorStatus} from "@containers/requests/types/errorStatus";
import Paper from "@mui/material/Paper";
import {DateTimePicker} from "@mui/x-date-pickers";
import moment from "moment";
import SelectCustom from "@ui/select/selectCustom/SelectCustom";
import {ISelectCustomItem} from "@ui/select/selectCustom/types";

const InputProps = {
	type: 'number'
}


const orderOptions:ISelectCustomItem<any>[] = [
	{
		label:'Без сортування',
		value:'null'
	},
	{
		label:'ASC',
		value:'ASC'
	},
	{
		label:'DESC',
		value:'DESC'
	}
]

interface Props {
	onSaveFilters: (filters: {
		dateStart: Date
		openUserId: number | null
		targetEndpoints: string[]
		errorStatus: RequestErrorStatus
		order: 'ASC' | 'DESC' | null
	}) => Promise<void>
	systemEndpoints: SystemEndpoint[],
}

const SystemStatusSidebarRequestListOptimistic = ({
													  onSaveFilters,
													  systemEndpoints,
												  }: Props) => {
	
	const [targetEndpoints, setTargetEndpoints] = useState<string[]>([])
	
	const [filters, setFilters] = useState<{
		dateStart: Date | null
		openUserId: number | null
		errorStatus: RequestErrorStatus
		order: 'ASC' | 'DESC' | null
	}>({
		dateStart: null,
		openUserId: null,
		errorStatus: 'all',
		order: null
	})
	
	const handleSaveFilters = async () => {
		if (!filters.dateStart) {
			return
		}
		await onSaveFilters({
			dateStart: filters.dateStart,
			openUserId: filters.openUserId,
			errorStatus: filters.errorStatus,
			targetEndpoints,
			order: filters.order,
		})
	}
	return (
		<Stack
			direction={'column'}
			gap={2}
			sx={sx.root}
		>
			
			<DateTimePicker
				value={moment(filters.dateStart)}
				format={'DD-MM-YYYY HH:mm'}
				onChange={(value) => {
					setFilters((prev) => {
						return {
							...prev,
							dateStart: moment(value).toDate()
						}
					})
				}}
				ampm={false}
				label={'Дата від'}
				slotProps={{
					textField: {
						size: 'small',
					}
				}}
			/>
			
			<SelectErrorStatus
				value={filters.errorStatus}
				onChange={(value) => {
					setFilters((prev) => {
						return {
							...prev,
							errorStatus: value
						}
					})
				}}
			/>
			
			<TextField
				size={'small'}
				fullWidth
				value={filters.openUserId ? String(filters.openUserId) : ''}
				onChange={(event) => setFilters((prev) => {
					return {
						...prev,
						openUserId: event.target.value ? Number(event.target.value) : null
					}
				})}
				label={'Open user id'}
				InputProps={InputProps}
			/>
			
			<SelectCustom
				value={filters.order || 'null'}
				onChange={(value) => {
					setFilters((prev) => {
						return {
							...prev,
							order:value === 'null' ? null : value as 'ASC' | 'DESC' | null
						}
					})
				}}
				data={orderOptions}
				label={'Сортування'}
			/>
			
			<Divider/>
			
			<SystemStatusEndpointsTree
				targetEndpoints={targetEndpoints}
				setTargetEndpoints={setTargetEndpoints}
				systemEndpoints={systemEndpoints}
			/>
			
			
			
			<Paper
				sx={sx.btnInner}
			>
				<Button
					onClick={handleSaveFilters}
					variant={'contained'}
					fullWidth
					disabled={!filters.dateStart}
				>
					Пошук
				</Button>
			</Paper>
		</Stack>
	);
};

export default SystemStatusSidebarRequestListOptimistic;

