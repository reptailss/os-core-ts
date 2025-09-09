import React from 'react'
import {AppContextValue} from "@appContext/AppContextValue";

export const useAppContext = () => React.useContext(AppContextValue)
