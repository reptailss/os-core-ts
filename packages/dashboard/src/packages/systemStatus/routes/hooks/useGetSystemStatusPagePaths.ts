import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import {useMemo} from "react";
import {DASHBOARD_SERVICE_OS_INFO_PATH_PATH} from "@packages/dashboardService/pages/osInfo/constants";
import {DASHBOARD_SERVICE_SERVER_LOGS_PATH_PATH} from "@packages/dashboardService/pages/serverLogs/constants";
import {SYSTEM_STATUS_HOME_PATH_PATH} from "@packages/systemStatus/pages/home/constants";
import {SYSTEM_STATUS_REQUEST_LIST_PATH_PATH} from "@packages/systemStatus/pages/requestList/constants";
import {SYSTEM_STATUS_READINESS_PATH_PATH} from "@packages/systemStatus/pages/readiness/constants";
import {SYSTEM_OS_LOGS_LIST_PATH_PATH} from "@packages/systemStatus/pages/systemOsLogsList/constants";
import {SYSTEM_OS_LOGS_CHARTS_PATH_PATH} from "@packages/systemStatus/pages/systemOsLogsCharts/constants";
import {SYSTEM_STATUS_REQUESTS_CHARTS_PATH_PATH} from "@packages/systemStatus/pages/requestsCharts/constants";

export function useGetSystemStatusPagePaths(): {
    home: string
    requestList: string
    serverLogs: string
    osInfo: string
    readiness: string
    systemOsLogsList: string
    systemOsLogsCharts: string
    requestCharts: string
} {
    return useMemo(() => {
        const baseUrl = getRootRoutePath()
        return {
            home: `${baseUrl}${SYSTEM_STATUS_HOME_PATH_PATH}`,
            requestList: `${baseUrl}${SYSTEM_STATUS_REQUEST_LIST_PATH_PATH}`,
            serverLogs: `${baseUrl}${DASHBOARD_SERVICE_SERVER_LOGS_PATH_PATH}`,
            osInfo: `${baseUrl}${DASHBOARD_SERVICE_OS_INFO_PATH_PATH}`,
            readiness: `${baseUrl}${SYSTEM_STATUS_READINESS_PATH_PATH}`,
            systemOsLogsList: `${baseUrl}${SYSTEM_OS_LOGS_LIST_PATH_PATH}`,
            systemOsLogsCharts: `${baseUrl}${SYSTEM_OS_LOGS_CHARTS_PATH_PATH}`,
            requestCharts: `${baseUrl}${SYSTEM_STATUS_REQUESTS_CHARTS_PATH_PATH}`,
        }
    }, [])
}