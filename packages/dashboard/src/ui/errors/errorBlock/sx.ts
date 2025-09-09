import { ERROR_COLOR } from "@views/constants/colors";

export const sx = {
    overlay: {
        backdropFilter: 'blur(2px)',
        width: '100%',
        position: 'absolute',
        left: '0',
        right: '0',
        top: '-10px',
        bottom: '0',
        height: '100%',
        zIndex: '666666',
    },
    inner: {
        padding: '15px',
        border: `1px solid ${ERROR_COLOR}`,
        minWith: '250px',
        '&.overlay': {
            position: 'absolute',
            left: '50%',
            top: '50%',
            zIndex: '666666',
            transform: 'translate(-50%, -50%)',
        }
    }
}