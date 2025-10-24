import {SxStyles} from '@sx'

export default {
    root: {
        width: '100%',
        backgroundColor: '#1b1b1d',
        borderRadius: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '50px',
        boxShadow: 'none',
        backgroundImage: 'none',
        '.lightTheme &': {
            backgroundColor: '#E0F2FE',
            boxShadow: 'rgba(0, 0, 0, 0.05)',
        }
    },
    inner: {
        paddingRight: {
            xs: '15px',
            lg: '30px',
        },
    },
    logo: {
        paddingLeft: '5px',
    },
    logoTitle: {
        color: '#fff',
        backgroundColor: 'rgba(255,255,255,.1)',
        borderRadius: '10px',
        padding: '2px 8px',
        '.lightTheme &': {
            backgroundColor: 'rgba(0,0,0,.1)',
            color: '#1E293B',
        }
    },
    burger: {
        display: {
            lg: 'none',
        },
        color: 'white',
    },
} as const satisfies SxStyles