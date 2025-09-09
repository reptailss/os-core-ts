import React, {FC, ReactNode, useState} from 'react'
import {IConfirmState, ISnackbarState, IViewContext} from "@viewContext/types";


export const ViewContext = React.createContext<IViewContext | null>(null)

interface IProps {
    children: ReactNode
}

const ViewContextProvider: FC<IProps> = ({
                                             children,
                                         }) => {


    const [snackBar, setSnackBar] = useState<ISnackbarState>({
        open: false,
        title: '',
        message: '',
        variant: 'success',
    })

    const [confirm, setConfirm] = useState<IConfirmState>({
        open: false,
        title: '',
        message: '',
        callback: () => {
        },
        cancelCallback: null,

    })


    return (
        <ViewContext.Provider value={{
            snackBar, setSnackBar,
            confirm, setConfirm,
        }}
        >
            {children}
        </ViewContext.Provider>
    );
};

export default ViewContextProvider;
