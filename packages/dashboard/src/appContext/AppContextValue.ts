import React from "react";
import {AppContext} from "@appContext/types/appContext";


export const AppContextValue = React.createContext<AppContext>({
    navigations:[]
})