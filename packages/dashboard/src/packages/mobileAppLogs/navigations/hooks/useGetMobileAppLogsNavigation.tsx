import {NavigateItem} from "@views/navigation/types";
import React, {useMemo} from "react";
import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import {
    useGetDashboardServiceNavigation
} from "@packages/dashboardService/navigations/hooks/useGetDashboardServiceNavigation";
import {MOBILE_APP_LOGS_LIST_PATH} from "@packages/mobileAppLogs/pages/mobileAppLogsList/constants";

const NAVIGATION: NavigateItem[] = [
    {text: 'Логи додатку', icon: <FactCheckIcon/>, path: MOBILE_APP_LOGS_LIST_PATH},
]


export function useGetMobileAppLogsNavigation(): NavigateItem[] {


    const dashboardServiceNavigations = useGetDashboardServiceNavigation()


    return useMemo(() => {
        const rootPath = getRootRoutePath()

        const baseNavigation = NAVIGATION.map((nav) => {
            return {
                ...nav,
                path: `${rootPath}${nav.path}`,
            }
        })

        return [
            ...dashboardServiceNavigations,
            ...baseNavigation,
        ]
    }, [dashboardServiceNavigations])
}