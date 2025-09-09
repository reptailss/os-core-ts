import {NavigateItem} from "@views/navigation/types";
import React, {useMemo} from "react";
import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import {
    useGetDashboardServiceNavigation
} from "@packages/dashboardService/navigations/hooks/useGetDashboardServiceNavigation";
import KeyIcon from '@mui/icons-material/Key';
import {MOB_APP_SETTINGS_PAGE_PATH} from "@packages/mobAppSettings/pages/mobAppSettings/constants";

const NAVIGATION: NavigateItem[] = [
    {text: 'Налаштування сповіщень', icon: <KeyIcon/>, path: MOB_APP_SETTINGS_PAGE_PATH},
]


export function useGetMobAppSettingsNavigation(): NavigateItem[] {


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