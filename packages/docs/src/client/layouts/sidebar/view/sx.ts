import {SxStyles} from '@sx'

export default {
	root: {
        height: '100%',
        backgroundColor: '#242427',
        overflowY: 'auto',
        paddingLeft:'10px',
        '.lightTheme &':{
            backgroundColor: '#1E293B',
        }
	},
} as const satisfies SxStyles