import React, {ReactNode} from 'react'
import {AppContextValue} from "@appContext/AppContextValue";
import {NavigateItem} from "@views/navigation/types";

interface IProps {
    children: ReactNode,
    navigations: NavigateItem[]
}


const AppContextProvider = ({
                                children,
                                navigations,
                            }: IProps) => {
    return (
        <AppContextValue.Provider
            value={{
                navigations,
            }}
        >
            {children}
        </AppContextValue.Provider>
    );
};

export default AppContextProvider;
