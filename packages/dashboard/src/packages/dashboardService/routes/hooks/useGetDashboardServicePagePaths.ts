import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";

import {DASHBOARD_SERVICE_REQUEST_LIST_PATH_PATH} from "@packages/dashboardService/pages/requestList/constants";
import {useMemo} from "react";
import {DASHBOARD_SERVICE_HOME_PATH_PATH} from "@packages/dashboardService/pages/home/constants";
import {
    DASHBOARD_SERVICE_DASHBOARD_SERVICE_CUSTOM_INFO_PATH_PATH_WIDTH_KEY
} from "@packages/dashboardService/pages/customPage/constants";
import {DASHBOARD_SERVICE_OS_INFO_PATH_PATH} from "@packages/dashboardService/pages/osInfo/constants";
import {DASHBOARD_SERVICE_READINESS_PATH_PATH} from "@packages/dashboardService/pages/readiness/constants";
import {DASHBOARD_SERVICE_SERVER_LOGS_PATH_PATH} from "@packages/dashboardService/pages/serverLogs/constants";

export function useGetDashboardServicePagePaths(): {
    home: string
    requestList: string
    serverLogs: string
    osInfo: string
    readiness: string
    customPageView: string
} {
    return useMemo(() => {
        const baseUrl = getRootRoutePath()
        return {
            home: `${baseUrl}${DASHBOARD_SERVICE_HOME_PATH_PATH}`,
            requestList: `${baseUrl}${DASHBOARD_SERVICE_REQUEST_LIST_PATH_PATH}`,
            serverLogs: `${baseUrl}${DASHBOARD_SERVICE_SERVER_LOGS_PATH_PATH}`,
            osInfo: `${baseUrl}${DASHBOARD_SERVICE_OS_INFO_PATH_PATH}`,
            readiness: `${baseUrl}${DASHBOARD_SERVICE_READINESS_PATH_PATH}`,
            customPageView: `${baseUrl}${DASHBOARD_SERVICE_DASHBOARD_SERVICE_CUSTOM_INFO_PATH_PATH_WIDTH_KEY}`,
        }
    }, [])
}