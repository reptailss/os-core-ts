import React from 'react';
import {Route, Routes} from "react-router-dom";
import DashboardServiceHomePage from "@packages/dashboardService/pages/home/DashboardServiceHomePage";
import DashboardServiceRequestListPage
    from "@packages/dashboardService/pages/requestList/DashboardServiceRequestListPage";
import DashboardServiceLogsPage from "@packages/dashboardService/pages/serverLogs/DashboardServiceLogsPage";
import DashboardServiceOsInfoPage from "@packages/dashboardService/pages/osInfo/DashboardServiceOsInfoPage";
import DashboardServiceReadinessPage from "@packages/dashboardService/pages/readiness/DashboardServiceReadinessPage";
import DashboardServiceCustomPage from "@packages/dashboardService/pages/customPage/DashboardServiceCustomPage";
import {useGetDashboardServicePagePaths} from "@packages/dashboardService/routes/hooks/useGetDashboardServicePagePaths";
import {useGetImageGeneratorPagePaths} from "@packages/imageGenerator/routes/hooks/useGetImageGeneratorPagePaths";
import ImageGeneratorTypesPage from "@packages/imageGenerator/pages/imageGeneratorTypes/ImageGeneratorTypesPage";

const ImageGeneratorRoutes = () => {

    const dashboardServicePagePaths = useGetDashboardServicePagePaths()
    const pagePaths = useGetImageGeneratorPagePaths()

    if (!dashboardServicePagePaths || !pagePaths) {
        return
    }
    return (
        <Routes>
            <Route element={<DashboardServiceHomePage/>} path={dashboardServicePagePaths.home}/>
            <Route element={<DashboardServiceRequestListPage/>} path={dashboardServicePagePaths.requestList}/>
            <Route element={<DashboardServiceLogsPage/>} path={dashboardServicePagePaths.serverLogs}/>
            <Route element={<DashboardServiceOsInfoPage/>} path={dashboardServicePagePaths.osInfo}/>
            <Route element={<DashboardServiceReadinessPage/>} path={dashboardServicePagePaths.readiness}/>
            <Route element={<DashboardServiceCustomPage/>} path={dashboardServicePagePaths.customPageView}/>
            <Route element={<ImageGeneratorTypesPage/>} path={pagePaths.generatorTypes}/>
        </Routes>

    )
};

export default ImageGeneratorRoutes;