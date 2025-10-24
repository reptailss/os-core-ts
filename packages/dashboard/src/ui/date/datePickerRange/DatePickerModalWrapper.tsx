import React, {ReactElement} from 'react';

import {Box, Modal} from "@mui/material";
import './styles.css'


const sx = {
	root: {
		width: '100%',
		padding: '10px',
		height: "100%",
		display: "flex",
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: {
			xs:'flex-end',
			lg:'center'
		}
	}
}

interface IProps {
	children: ReactElement,
	open: boolean,
	onClose: () => void,
	anchorEl: HTMLButtonElement | null,
}

const DatePickerModalWrapper = ({
									open,
									onClose,
									children,
									anchorEl,
								}: IProps) => {
	
	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<Box
				sx={sx.root}
			>
				{children}
			</Box>
		</Modal>
	)
};

export default DatePickerModalWrapper;
