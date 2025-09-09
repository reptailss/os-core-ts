import React from 'react'
import { RequestsContextValue } from '@containers/requests/context/RequestsContextValue'

export const useRequestsContext = () => React.useContext(RequestsContextValue)
