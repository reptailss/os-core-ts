import {SxStyles} from '@sx'

export default {
    root: {
        position: 'sticky',
        top: '3px',
        left: '10px',
        zIndex: 555,
        display: 'inline-flex',
        padding: '4px',
        backgroundColor: '#121212',
        '.lightTheme &': {
            backgroundColor: '#E0F2FE',
        }
    },
    btn: {
    
    }
} as const satisfies SxStyles