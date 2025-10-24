import {NavigateItem} from "@views/navigation/types";
import React, {useMemo} from "react";
import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import {SYSTEM_STATUS_HOME_PATH_PATH} from "@packages/systemStatus/pages/home/constants";
import {SYSTEM_STATUS_SERVER_LOGS_PATH_PATH} from "@packages/systemStatus/pages/serverLogs/constants";
import {
    SYSTEM_STATUS_REQUEST_LIST_OPTIMISTIC_PATH_PATH,
    SYSTEM_STATUS_REQUEST_LIST_PATH_PATH
} from "@packages/systemStatus/pages/requestList/constants";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import {SYSTEM_STATUS_READINESS_PATH_PATH} from "@packages/systemStatus/pages/readiness/constants";
import InfoIcon from "@mui/icons-material/Info";
import {SYSTEM_STATUS_OS_INFO_PATH_PATH} from "@packages/systemStatus/pages/osInfo/constants";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import {SYSTEM_OS_LOGS_LIST_PATH_PATH} from "@packages/systemStatus/pages/systemOsLogsList/constants";
import {SYSTEM_OS_LOGS_CHARTS_PATH_PATH} from "@packages/systemStatus/pages/systemOsLogsCharts/constants";
import BarChartIcon from '@mui/icons-material/BarChart';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {SYSTEM_STATUS_REQUESTS_CHARTS_PATH_PATH} from "@packages/systemStatus/pages/requestsCharts/constants";
import StorageIcon from '@mui/icons-material/Storage';
import TimelineIcon from '@mui/icons-material/Timeline';
const NAVIGATION: NavigateItem[] = [
    {text: 'Головна', icon: <HomeRoundedIcon/>, path: SYSTEM_STATUS_HOME_PATH_PATH},
    {text: 'Логи', icon: <LogoDevIcon/>, path: SYSTEM_STATUS_SERVER_LOGS_PATH_PATH},
    {text: 'Операційна система', icon: <DesktopWindowsIcon/>, path: SYSTEM_STATUS_OS_INFO_PATH_PATH},
    {text: 'Статус', icon: <InfoIcon/>, path: SYSTEM_STATUS_READINESS_PATH_PATH},
    {text: 'Запити сервісів(за місяць)', icon: <StorageIcon/>, path: SYSTEM_STATUS_REQUEST_LIST_OPTIMISTIC_PATH_PATH},
    {text: 'Запити сервісів(за весь час)', icon: <StorageIcon/>, path: SYSTEM_STATUS_REQUEST_LIST_PATH_PATH},
    {text: 'Запити сервісів(графік)', icon: <TimelineIcon/>, path: SYSTEM_STATUS_REQUESTS_CHARTS_PATH_PATH},
    {text: 'Статуси сервісів', icon: <AutorenewIcon/>, path: SYSTEM_OS_LOGS_LIST_PATH_PATH},
    {text: 'Статуси сервісів(графіки)', icon: <BarChartIcon/>, path: SYSTEM_OS_LOGS_CHARTS_PATH_PATH},
]

export function useGetSystemStatusNavigation(): NavigateItem[] {

    return useMemo(() => {
        const rootPath = getRootRoutePath()

        return NAVIGATION.map((nav) => {
            return {
                ...nav,
                path: `${rootPath}${nav.path}`,
            }
        })
    }, [])
}