import { ERROR_COLOR } from "@views/constants/colors";

export const sx = {
    root: {
        '.lightTheme &':{
            backgroundColor: '#fff',
        },

        '&.disabledPointerEvents': {
            pointerEvents: 'none',
            '& .MuiAutocomplete-popupIndicator': {
                display: 'none'
            },

        },
        '&.error': {
            '& .MuiFormLabel-root': {
                color: ERROR_COLOR
            },
            '& .MuiInputBase-root': {
                color: ERROR_COLOR
            },
            '& .MuiOutlinedInput-notchedOutline': {
                color: ERROR_COLOR
            }
        }
    },
    spinner:{
        position:'absolute',
        right:'40px',
        top:'10px',
    }
}