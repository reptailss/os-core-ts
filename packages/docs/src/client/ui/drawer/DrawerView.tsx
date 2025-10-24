import sx from './sx'
import React, {ReactNode} from 'react'
import {Box, Drawer, IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Stack from '@mui/material/Stack'

const DrawerView = ({
						open,
						onClose,
						children,
					}: {
	open: boolean
	onClose: () => void
	children: ReactNode
}) => {
	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={onClose}
			sx={sx.root}
		>
			<Box
				sx={sx.drawerContainer}
			>
				<Stack
					direction={'row'}
					alignItems={'center'}
					justifyContent={'flex-end'}
				>
					<IconButton
						onClick={onClose}
						sx={sx.closeButton}
					>
						<CloseIcon
							sx={sx.closeButtonIcon}
						/>
					</IconButton>
				</Stack>
				
				{children}
			</Box>
		</Drawer>
	)
}

export default DrawerView