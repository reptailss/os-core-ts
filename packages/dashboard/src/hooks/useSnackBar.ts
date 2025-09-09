import {useViewContext} from "@viewContext/hooks/useViewContext";

export function useSnackBar() {

    const {setSnackBar: setSnackBarGlobal} = useViewContext()

    const setSnackBar = ({message, variant = 'success', title = ''}: {
        message?: string,
        variant?: 'success' | 'error' | 'warning' | 'info',
        title?: string,
    }) => {
        setSnackBarGlobal({
            message: message || '',
            title, variant,
            open: true
        })
    };
    return {
        setSnackBar
    }
}