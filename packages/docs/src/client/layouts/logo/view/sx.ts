import {SxStyles} from '@sx'

export default {
	root: {
        backgroundColor: 'rgba(255,255,255,.5)',
        borderRadius: '10px',
        padding: '7px 12px',
        display:'flex',
        alignItems:'center',
        gap:'5px',
        '.lightTheme &': {
            color: '#1E293B',
        }
	},
} as const satisfies SxStyles