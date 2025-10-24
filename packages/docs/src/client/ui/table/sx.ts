import {SxStyles} from '@sx'

export default {
    root:{
        width: '100%', overflow: 'hidden'
    },
    container:{
        maxHeight: 440
    },
    row:{
        '&:last-child td, &:last-child th': {border: 0}
    }
} as const satisfies SxStyles