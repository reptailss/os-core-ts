import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import {useMemo} from "react";
import {MOB_APP_SETTINGS_PAGE_PATH} from "@packages/mobAppSettings/pages/mobAppSettings/constants";

export function useGetMobAppSettingsPagePaths(): {
    notificationSettings: string
} {
    return useMemo(() => {
        const baseUrl = getRootRoutePath()
        return {
            notificationSettings: `${baseUrl}${MOB_APP_SETTINGS_PAGE_PATH}`,
        }
    }, [])
}