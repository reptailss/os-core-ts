import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppTheme from '@views/theme/AppTheme'
import AuthContextProvider from '@containers/auth/context/AuthContextProvider'
import Auth from '@containers/auth/Auth'
import RootLayout from '@views/layouts/rootLayout/RootLayout'
import '@baseStyles/app.css'
import AppContextProvider from '@appContext/AppContextProvider'
import SystemStatusRoutes from "@packages/systemStatus/routes/SystemStatusRoutes";
import {useGetSystemStatusNavigation} from "@packages/systemStatus/navigations/hooks/useGetSystemStatusNavigation";
import ViewContextProvider from "@viewContext/ViewContextProvider";


const SystemStatusApp = () => {

    const navigations = useGetSystemStatusNavigation()

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
                                <SystemStatusRoutes/>
                            </RootLayout>
                        </Auth>
                    </AuthContextProvider>
                </AppContextProvider>
            </ViewContextProvider>

        </AppTheme>
    )
}

export default SystemStatusApp