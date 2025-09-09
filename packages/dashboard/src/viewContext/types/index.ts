import {SetStateFn} from "@baseTypes/state";


export interface ISnackbarState {
    open: boolean,
    title?: string,
    message: string,
    variant: 'success' | 'error' | 'warning' | 'info',
}

export interface IConfirmState {
    open: boolean,
    title: string,
    message: string,
    callback: () => void | null,
    cancelCallback?: CancelCallback | null,
}

type CancelCallback = () => void | null

export interface IViewContext {
    snackBar: ISnackbarState,
    setSnackBar: SetStateFn<ISnackbarState>,
    confirm: IConfirmState,
    setConfirm: SetStateFn<IConfirmState>,
}