import {NavigateItem} from "@views/navigation/types";
import React, {useMemo} from "react";
import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import {
    useGetDashboardServiceNavigation
} from "@packages/dashboardService/navigations/hooks/useGetDashboardServiceNavigation";
import SettingsIcon from '@mui/icons-material/Settings';
import {BANK_SYNC_TYPES_PAGE_PATH} from "@packages/bankSync/pages/bankSyncParsingTypes/constants";

const NAVIGATION: NavigateItem[] = [
    {text: 'Типи парсингу банківських транзакцій', icon: <SettingsIcon/>, path: BANK_SYNC_TYPES_PAGE_PATH},
]

export function useGetBankSyncNavigation(): NavigateItem[] {


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