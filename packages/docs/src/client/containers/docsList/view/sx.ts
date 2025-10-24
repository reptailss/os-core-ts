import {SxStyles} from '@sx'

export default {
    root: {
        margin: '10px 0',
    },
    docPage: {
        padding: '20px 15px',
    },
    primaryText: {
        color: '#0894e2',
        fontWeight: 700,
        marginBottom: '10px',
    },
    text:{
        '& .primary':{
            color: '#0894e2',
            fontWeight: 700,
            marginBottom: '10px',
        },
        '& link':{
            color:'#f1455f',
            transition:' all .3s',
            fontWeight: 600,
        }
    }
} as const satisfies SxStyles