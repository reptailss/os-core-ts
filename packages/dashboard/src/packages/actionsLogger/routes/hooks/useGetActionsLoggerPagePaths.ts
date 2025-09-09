import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import {useMemo} from "react";
import {ACTIONS_LOGGER_REQUEST_LIST_PATH_PATH} from "@packages/actionsLogger/pages/actionsLoggerList/constants";

export function useGetActionsLoggerPagePaths(): {
    actionsLoggerList: string
} {
    return useMemo(() => {
        const baseUrl = getRootRoutePath()
        return {
            actionsLoggerList: `${baseUrl}${ACTIONS_LOGGER_REQUEST_LIST_PATH_PATH}`,
        }
    }, [])
}