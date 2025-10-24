import {SxStyles} from '@sx'

export default {
    fileName: {
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: '#151515',
        width: '100%',
        height: '50px',
        color: '#fff',
        padding: '12px 30px',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px',
        '.lightTheme &': {
            backgroundColor: '#F3F4F6',
            color:'#1F2937'
        }
    },
    inner: {
        position: 'relative',
        paddingTop: '35px',
        marginTop: '10px'
    }
} as const satisfies SxStyles