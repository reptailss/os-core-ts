import {SxStyles} from '@sx'

export default {
	root: {
		'& .MuiPaper-root': {
			backgroundColor: '#2E3C43',
		},
	},
	menuButton: {
		display: {xs: 'inline-flex', md: 'none'},
		ml: 1,
	},
	drawerContainer: {
		width: 250,
		pt: 1,
		backgroundColor: '#2E3C43',
		minHeight: '100%',
		flex: 1,
	},
	closeButton: {
		display: 'flex',
		justifyContent: 'flex-end',
		px: 1,
	},
	closeButtonIcon: {
		color: 'white',
	},
} as const satisfies SxStyles