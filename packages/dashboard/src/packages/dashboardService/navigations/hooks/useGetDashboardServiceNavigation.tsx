import {NavigateItem} from "@views/navigation/types";
import React, {useMemo} from "react";
import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import InfoIcon from "@mui/icons-material/Info";
import {
    dashboardServiceBuildCustomPagePath
} from "@packages/dashboardService/pages/customPage/helpers/buildCustomPagePath";
import {useGetCustomPages} from "@containers/customPages/hooks/useGetCustomPages";
import {DASHBOARD_SERVICE_REQUEST_LIST_PATH_PATH} from "@packages/dashboardService/pages/requestList/constants";
import {DASHBOARD_SERVICE_SERVER_LOGS_PATH_PATH} from "@packages/dashboardService/pages/serverLogs/constants";
import {DASHBOARD_SERVICE_READINESS_PATH_PATH} from "@packages/dashboardService/pages/readiness/constants";
import {DASHBOARD_SERVICE_OS_INFO_PATH_PATH} from "@packages/dashboardService/pages/osInfo/constants";
import {DASHBOARD_SERVICE_HOME_PATH_PATH} from "@packages/dashboardService/pages/home/constants";


const NAVIGATION: NavigateItem[] = [
    {text: 'Головна', icon: <HomeRoundedIcon/>, path: DASHBOARD_SERVICE_HOME_PATH_PATH},
    {text: 'Запити', icon: <AnalyticsRoundedIcon/>, path: DASHBOARD_SERVICE_REQUEST_LIST_PATH_PATH},
    {text: 'Логи', icon: <LogoDevIcon/>, path: DASHBOARD_SERVICE_SERVER_LOGS_PATH_PATH},
    {text: 'Операційна система', icon: <DesktopWindowsIcon/>, path: DASHBOARD_SERVICE_OS_INFO_PATH_PATH},
    {text: 'Статус', icon: <InfoIcon/>, path: DASHBOARD_SERVICE_READINESS_PATH_PATH},
]

export function useGetDashboardServiceNavigation(): NavigateItem[] {

    const {customPages} = useGetCustomPages()

    return useMemo(() => {
        const rootPath = getRootRoutePath()

        const baseNavigation = NAVIGATION.map((nav) => {
            return {
                ...nav,
                path: `${rootPath}${nav.path}`,
            }
        })
        if (!customPages?.length) {
            return baseNavigation
        }
        const customPagesNavigation = customPages.map((nav) => {
            return {
                path: `${rootPath}${dashboardServiceBuildCustomPagePath(nav.pagePath)}`,
                text: nav.pageName,
            }
        })
        return [
            ...baseNavigation,
            ...customPagesNavigation,
        ]
    }, [customPages])
}