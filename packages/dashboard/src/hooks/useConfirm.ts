import { useViewContext } from "@viewContext/hooks/useViewContext";

export function useConfirm() {
    const {setConfirm: setConfirmGlobal} = useViewContext()
    const setConfirm = ({message = '', callback, title = '',cancelCallback}: {
        message: string,
        title?: string,
        callback: () => void | null,
        cancelCallback?: () => void | null,
    }) => {
        setConfirmGlobal({
            message, callback,cancelCallback, title, open: true
        })
    };

    return {setConfirm}

};