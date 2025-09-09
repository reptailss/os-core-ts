import {NavigateItem} from "@views/navigation/types";
import React, {useMemo} from "react";
import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import {
    useGetDashboardServiceNavigation
} from "@packages/dashboardService/navigations/hooks/useGetDashboardServiceNavigation";
import SettingsIcon from '@mui/icons-material/Settings';
import {IMAGE_GENERATOR_TYPES_PAGE_PATH} from "@packages/imageGenerator/pages/imageGeneratorTypes/constants";

const NAVIGATION: NavigateItem[] = [
    {text: 'Типи генерацій зображень', icon: <SettingsIcon/>, path: IMAGE_GENERATOR_TYPES_PAGE_PATH},
]

export function useGetImageGeneratorNavigation(): NavigateItem[] {


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