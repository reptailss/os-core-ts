import {NavigateItem} from "@views/navigation/types";
import React, {useMemo} from "react";
import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import {
    useGetDashboardServiceNavigation
} from "@packages/dashboardService/navigations/hooks/useGetDashboardServiceNavigation";
import {GLOBAL_SERVICE_ENDPOINTS_LIST_PATH_PATH} from "@packages/access/pages/globalServiceEndpointsList/constants";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import {STRUCTURE_PLUGIN_TYPES_PAGE_PATH} from "@packages/access/pages/structurePluginTypes/constants";
import KeyIcon from '@mui/icons-material/Key';
import {DASHBOARD_SERVICE_REQUEST_LIST_PATH_PATH} from "@packages/dashboardService/pages/requestList/constants";

const NAVIGATION: NavigateItem[] = [
    {text: 'Список сервісів', icon: <WhatshotIcon/>, path: GLOBAL_SERVICE_ENDPOINTS_LIST_PATH_PATH},
    {text: 'Типи плагінів', icon: <KeyIcon/>, path: STRUCTURE_PLUGIN_TYPES_PAGE_PATH},
]


export function useGetAccessNavigation(): NavigateItem[] {


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
            ...dashboardServiceNavigations.filter((item) => item.path !== DASHBOARD_SERVICE_REQUEST_LIST_PATH_PATH),
            ...baseNavigation,
        ]
    }, [dashboardServiceNavigations])
}