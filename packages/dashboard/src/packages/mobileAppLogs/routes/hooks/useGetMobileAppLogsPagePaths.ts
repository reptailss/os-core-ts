import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import { MOBILE_APP_LOGS_LIST_PATH } from "@packages/mobileAppLogs/pages/mobileAppLogsList/constants";
import {useMemo} from "react";

export function useGetMobileAppLogsPagePaths(): {
    mobileAppLogsList: string
} {
    return useMemo(() => {
        const baseUrl = getRootRoutePath()
        return {
            mobileAppLogsList: `${baseUrl}${MOBILE_APP_LOGS_LIST_PATH}`,
        }
    }, [])
}