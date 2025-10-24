import React from 'react'
import './app.css'

import {CssBaseline} from '@mui/material'

import {BrowserRouter} from 'react-router-dom'
import RoutesApp from '@routes/RoutesApp'
import RootLayout from '@layouts/rootLayout/RootLayout'
import {DocsJson} from '@docJson/types'
import AppClientDocJsonContextProvider from '@appClient/provider/AppClientDocJsonContextProvider'
import AppClientThemeProvider from '@appClient/provider/AppClientThemeProvider'


const AppClient = ({
                       docsJson
                   }: {
    docsJson: DocsJson
}) => {
    return (
        <AppClientThemeProvider>
            <CssBaseline />
            <BrowserRouter>
                <AppClientDocJsonContextProvider
                    docsJson={docsJson}
                >
                    <RootLayout>
                        <RoutesApp />
                    </RootLayout>
                </AppClientDocJsonContextProvider>
            </BrowserRouter>
        </AppClientThemeProvider>
    )
}

export default AppClient
