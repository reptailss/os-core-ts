import React, {ReactNode} from 'react'
import {AppClientDocJsonContext} from '@appClient/context'
import {DocsJson} from '@docJson/types'

const AppClientDocJsonContextProvider = ({
                                children,
                                docsJson,
                            }: {
    children: ReactNode
    docsJson: DocsJson
}) => {
    return (
        <AppClientDocJsonContext.Provider
            value={docsJson}
        >
            {children}
        </AppClientDocJsonContext.Provider>
    )
}

export default AppClientDocJsonContextProvider