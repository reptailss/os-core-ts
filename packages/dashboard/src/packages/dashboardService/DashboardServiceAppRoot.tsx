import React, {ReactNode} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "@views/theme/AppTheme";
import AuthContextProvider from "@containers/auth/context/AuthContextProvider";
import Auth from "@containers/auth/Auth";
import RootLayout from "@views/layouts/rootLayout/RootLayout";
import "@baseStyles/app.css"
import AppContextProvider from "@appContext/AppContextProvider";
import DashboardServiceRequestsContext
    from "@packages/dashboardService/containers/requests/context/DashboardServiceRequestsContext";
import DashboardServiceSidebar from "@packages/dashboardService/views/DashboardServiceSidebar";
import {NavigateItem} from "@views/navigation/types";
import ViewContextProvider from "@viewContext/ViewContextProvider";


interface IProps {
    children?: ReactNode,
    navigations: NavigateItem[]
}


const DashboardServiceAppRoot = ({
                                     children,
                                     navigations,
                                 }: IProps) => {

    return (
        <AppTheme>
            <CssBaseline/>
            <ViewContextProvider>
                <AppContextProvider
                    navigations={navigations}
                >
                    <AuthContextProvider>
                        <Auth>
                            <DashboardServiceRequestsContext>
                                <RootLayout
                                    sidebarChildren={<DashboardServiceSidebar/>}
                                >
                                    {children}
                                </RootLayout>
                            </DashboardServiceRequestsContext>
                        </Auth>
                    </AuthContextProvider>
                </AppContextProvider>
            </ViewContextProvider>
        </AppTheme>
    );
};

export default DashboardServiceAppRoot;