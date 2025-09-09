import {NavigateItem} from "@views/navigation/types";
import React, {useMemo} from "react";
import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import {
    useGetDashboardServiceNavigation
} from "@packages/dashboardService/navigations/hooks/useGetDashboardServiceNavigation";
import {ACTIONS_LOGGER_REQUEST_LIST_PATH_PATH} from "@packages/actionsLogger/pages/actionsLoggerList/constants";

const NAVIGATION: NavigateItem[] = [
    {text: 'Логер дій', icon: <FactCheckIcon/>, path: ACTIONS_LOGGER_REQUEST_LIST_PATH_PATH},
]


export function useGetActionsLoggerNavigation(): NavigateItem[] {


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