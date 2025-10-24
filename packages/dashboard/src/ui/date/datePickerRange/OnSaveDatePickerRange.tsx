import React from 'react'
import DateObject from 'react-date-object'
import Stack from '@mui/material/Stack'


import {OnSaveDatePickerRangeCB} from '@ui/date/datePickerRange/types'
import Button from '@mui/material/Button'


const sx = {
	root: {
		padding: '10px'
	}
}


interface IProps {
	state?: {
		selectedDate: DateObject[],
		format: string
	},
	position: 'bottom',
	onSave: OnSaveDatePickerRangeCB,
	onClose: () => void,
	showTime?: boolean
}

const OnSaveDatePickerRange = ({
								   state,
								   onSave,
								   onClose,
								   showTime,
							   }: IProps) => {
	
	
	const handleSave = async () => {
		if (!state?.selectedDate || state?.selectedDate?.length < 2) {
			return
		}
		const dateStart = state.selectedDate[0].toDate()
		const dateEnd = state.selectedDate[1].toDate()
		await onSave({
			dateStart,
			dateEnd,
			showTime: !!showTime
		})
	}
	return (
		<Stack
			justifyContent={'flex-end'}
			alignItems={'center'}
			direction={'row'}
			gap={1}
			sx={sx.root}
		>
			<Button
				fullWidth={false}
				variant={'outlined'}
				onClick={onClose}
			>
				Закрити
			</Button>
			
			<Button
				fullWidth={false}
				variant={'contained'}
				disabled={!state?.selectedDate || state?.selectedDate?.length < 2}
				onClick={handleSave}
			>
				ok
			</Button>
		</Stack>
	)
}

export default OnSaveDatePickerRange
