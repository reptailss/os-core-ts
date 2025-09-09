import {useMemo} from "react";
import {useGetSystemEndpoints} from "@packages/systemStatus/containers/endpoints/hooks/useGetSystemEndpoints";

export function useGetSystemStatusServices(): {
    services: string[],
    isLoading:boolean
} {

    const {systemEndpoints, isLoading} = useGetSystemEndpoints()

    const services = useMemo(() => {
        if (!systemEndpoints?.length) {
            return []
        }
        const map: Record<string, boolean> = {}
        systemEndpoints.forEach(endpoint => {
            map[endpoint.service_key] = true;
        })
        return Object.keys(map)

    }, [systemEndpoints])

    return {
        services,
        isLoading
    }
}