import { ERROR_COLOR } from "@views/constants/colors";

export const sx = {
    item: {
        display: 'flex',
        whiteSpace: 'pre-wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
       '.lightTheme &':{
           '&.hover': {
               backgroundColor: 'rgba(0, 0, 0, 0.2)'
           },
           '&.active': {
               backgroundColor: 'rgba(0, 0, 0, 0.1)'
           },
       },
        '&.error': {
            color: ERROR_COLOR
        },
    },
    notItems: {
        margin: 0,
        padding: '8px'
    },
    control: {
        '.lightTheme & .MuiFormLabel-root': {
            color: '#000000'
        }

    },
    root: {
       '.lightTheme &':{
           backgroundColor: '#fff',
       }

    }
}