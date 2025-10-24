import React from 'react';
import {Route, Routes} from "react-router-dom";
import SystemStatusHomePage from "@packages/systemStatus/pages/home/SystemStatusHomePage";
import {useGetSystemStatusPagePaths} from "@packages/systemStatus/routes/hooks/useGetSystemStatusPagePaths";
import SystemStatusRequestListPage from "@packages/systemStatus/pages/requestList/SystemStatusRequestListPage";
import SystemStatusLogsPage from "@packages/systemStatus/pages/serverLogs/SystemStatusLogsPage";
import SystemStatusReadinessPage from "@packages/systemStatus/pages/readiness/SystemStatusReadinessPage";
import SystemStatusOsInfoPage from "@packages/systemStatus/pages/osInfo/SystemStatusOsInfoPage";
import SystemOsLogsListPage from "@packages/systemStatus/pages/systemOsLogsList/SystemOsLogsListPage";
import SystemOsLogsChartsPage from "@packages/systemStatus/pages/systemOsLogsCharts/SystemOsLogsChartsPage";
import SystemStatusRequestsChartsPage from "@packages/systemStatus/pages/requestsCharts/SystemStatusRequestsChartsPage";
import SystemStatusRequestListOptimisticPage
	from "@packages/systemStatus/pages/requestList/SystemStatusRequestListOptimisticPage";

const SystemStatusRoutes = () => {
	
	const pagePaths = useGetSystemStatusPagePaths()
	return (
		<Routes>
			<Route element={<SystemStatusHomePage/>} path={pagePaths.home}/>
			<Route element={<SystemStatusRequestListPage/>} path={pagePaths.requestList}/>
			<Route element={<SystemStatusRequestListOptimisticPage/>} path={pagePaths.requestListOptimistic}/>
			<Route element={<SystemStatusLogsPage/>} path={pagePaths.serverLogs}/>
			<Route element={<SystemStatusOsInfoPage/>} path={pagePaths.osInfo}/>
			<Route element={<SystemStatusReadinessPage/>} path={pagePaths.readiness}/>
			<Route element={<SystemOsLogsListPage/>} path={pagePaths.systemOsLogsList}/>
			<Route element={<SystemOsLogsChartsPage/>} path={pagePaths.systemOsLogsCharts}/>
			<Route element={<SystemStatusRequestsChartsPage/>} path={pagePaths.requestCharts}/>
		</Routes>
	
	)
};

export default SystemStatusRoutes;