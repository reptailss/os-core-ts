import React from 'react';
import {Route, Routes} from "react-router-dom";
import DashboardServiceHomePage from "@packages/dashboardService/pages/home/DashboardServiceHomePage";
import DashboardServiceRequestListPage from "@packages/dashboardService/pages/requestList/DashboardServiceRequestListPage";
import DashboardServiceLogsPage from "@packages/dashboardService/pages/serverLogs/DashboardServiceLogsPage";
import DashboardServiceOsInfoPage from "@packages/dashboardService/pages/osInfo/DashboardServiceOsInfoPage";
import DashboardServiceReadinessPage from "@packages/dashboardService/pages/readiness/DashboardServiceReadinessPage";
import DashboardServiceCustomPage from "@packages/dashboardService/pages/customPage/DashboardServiceCustomPage";
import {useGetDashboardServicePagePaths} from "@packages/dashboardService/routes/hooks/useGetDashboardServicePagePaths";

const DashboardServiceRoutes = () => {

    const pagePaths = useGetDashboardServicePagePaths()

    if (!pagePaths) {
        return
    }
    return (
        <Routes>
            <Route element={<DashboardServiceHomePage/>} path={pagePaths.home}/>
            <Route element={<DashboardServiceRequestListPage/>} path={pagePaths.requestList}/>
            <Route element={<DashboardServiceLogsPage/>} path={pagePaths.serverLogs}/>
            <Route element={<DashboardServiceOsInfoPage/>} path={pagePaths.osInfo}/>
            <Route element={<DashboardServiceReadinessPage/>} path={pagePaths.readiness}/>
            <Route element={<DashboardServiceCustomPage/>} path={pagePaths.customPageView}/>
        </Routes>

    )
};

export default DashboardServiceRoutes;