import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppTheme from '@views/theme/AppTheme'
import AuthContextProvider from '@containers/auth/context/AuthContextProvider'
import Auth from '@containers/auth/Auth'
import RootLayout from '@views/layouts/rootLayout/RootLayout'
import '@baseStyles/app.css'
import AppContextProvider from '@appContext/AppContextProvider'
import ViewContextProvider from "@viewContext/ViewContextProvider";
import {useGetActionsLoggerNavigation} from "@packages/actionsLogger/navigations/hooks/useGetActionsLoggerNavigation";
import ActionsLoggerRoutes from "@packages/actionsLogger/routes/ActionsLoggerRoutes";


const ActionsLoggerApp = () => {

    const navigations = useGetActionsLoggerNavigation()

    return (
        <AppTheme>
            <CssBaseline/>
            <ViewContextProvider>
                <AppContextProvider
                    navigations={navigations}
                >
                    <AuthContextProvider>
                        <Auth>
                            <RootLayout>
                                <ActionsLoggerRoutes/>
                            </RootLayout>
                        </Auth>
                    </AuthContextProvider>
                </AppContextProvider>
            </ViewContextProvider>

        </AppTheme>
    )
}

export default ActionsLoggerApp