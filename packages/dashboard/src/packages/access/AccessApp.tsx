import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppTheme from '@views/theme/AppTheme'
import AuthContextProvider from '@containers/auth/context/AuthContextProvider'
import Auth from '@containers/auth/Auth'
import RootLayout from '@views/layouts/rootLayout/RootLayout'
import '@baseStyles/app.css'
import AppContextProvider from '@appContext/AppContextProvider'
import ViewContextProvider from "@viewContext/ViewContextProvider";
import AccessRoutes from "@packages/access/routes/AccessRoutes";
import {useGetAccessNavigation} from "@packages/access/navigations/hooks/useGetAccessNavigation";


const AccessApp = () => {

    const navigations = useGetAccessNavigation()

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
                                <AccessRoutes/>
                            </RootLayout>
                        </Auth>
                    </AuthContextProvider>
                </AppContextProvider>
            </ViewContextProvider>

        </AppTheme>
    )
}

export default AccessApp