import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppTheme from '@views/theme/AppTheme'
import AuthContextProvider from '@containers/auth/context/AuthContextProvider'
import Auth from '@containers/auth/Auth'
import RootLayout from '@views/layouts/rootLayout/RootLayout'
import '@baseStyles/app.css'
import AppContextProvider from '@appContext/AppContextProvider'
import ViewContextProvider from "@viewContext/ViewContextProvider";
import {useGetMobileAppLogsNavigation} from "@packages/mobileAppLogs/navigations/hooks/useGetMobileAppLogsNavigation";
import MobileAppLogsRoutes from "@packages/mobileAppLogs/routes/MobileAppLogsRoutes";


const MobileAppLogsApp = () => {

    const navigations = useGetMobileAppLogsNavigation()

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
                                <MobileAppLogsRoutes/>
                            </RootLayout>
                        </Auth>
                    </AuthContextProvider>
                </AppContextProvider>
            </ViewContextProvider>

        </AppTheme>
    )
}

export default MobileAppLogsApp