import React from 'react'
import {AuthContextValue} from "@containers/auth/context/AuthContextProvider";

export const useAuthContext = () => React.useContext(AuthContextValue)
