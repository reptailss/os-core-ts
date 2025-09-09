import React from 'react';
import "@baseStyles/app.css"

import {
    useGetDashboardServiceNavigation
} from "@packages/dashboardService/navigations/hooks/useGetDashboardServiceNavigation";
import DashboardServiceAppRoot from "@packages/dashboardService/DashboardServiceAppRoot";
import DashboardServiceRoutes from "@packages/dashboardService/routes/DashboardServiceRoutes";


const DashboardServiceApp = () => {

    const navigations = useGetDashboardServiceNavigation()

    return (
        <DashboardServiceAppRoot
            navigations={navigations}
        >
            <DashboardServiceRoutes/>
        </DashboardServiceAppRoot>
    )
};

export default DashboardServiceApp;