import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import {useMemo} from "react";
import {GLOBAL_SERVICE_ENDPOINTS_LIST_PATH_PATH} from "@packages/access/pages/globalServiceEndpointsList/constants";
import {STRUCTURE_PLUGIN_TYPES_PAGE_PATH} from "@packages/access/pages/structurePluginTypes/constants";

export function useGetAccessPagePaths(): {
    globalServiceEndpoints: string
    structurePluginTypes: string
} {
    return useMemo(() => {
        const baseUrl = getRootRoutePath()
        return {
            globalServiceEndpoints: `${baseUrl}${GLOBAL_SERVICE_ENDPOINTS_LIST_PATH_PATH}`,
            structurePluginTypes: `${baseUrl}${STRUCTURE_PLUGIN_TYPES_PAGE_PATH}`,
        }
    }, [])
}