import {useCallback, useEffect, useState} from "react";
import {EndpointNode} from "@containers/requests/types/endpoint";
import {SetStateFn} from "@baseTypes/state";
import {removeDynamicSegments} from "@containers/requests/helpers/removeDynamicSegments";
import {TransformServerMeta} from "@containers/requests/types/transform";
import {getDashboardServiceRequests} from "@packages/dashboardService/containers/requests/api/getRequests";


export function useGetDashboardServiceRequests({
                                                   setTargetEndpoints,
                                               }: {
    setTargetEndpoints: SetStateFn<string[]>
}): {
    isLoading: boolean,
    requests: TransformServerMeta[],
    refetch: () => Promise<void>,
    endpointPaths: string[],
    endpointsTree: EndpointNode[],
} {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [requests, setRequests] = useState<TransformServerMeta[]>([])
    const [endpointPaths, setEndpointPaths] = useState<string[]>([])
    const [endpointsTree, setEndpointsTree] = useState<EndpointNode[]>([])

    useEffect(() => {


        const init = async () => {
            try {
                setIsLoading(true)
                const res = await getDashboardServiceRequests()
                setRequests(res?.requests)
                setTargetEndpoints(removeDynamicSegments(res?.paths))
                setEndpointPaths(res?.paths)
                setEndpointsTree(res?.endpointsTree)

            } catch (error) {
                setRequests([])
                setTargetEndpoints([])
                setEndpointPaths([])
                setEndpointsTree([])
            } finally {
                setIsLoading(false)
            }
        }

        init()
    }, []);

    const refetch = useCallback(async () => {
        try {
            setIsLoading(true)
            const res = await getDashboardServiceRequests()
            setRequests(res?.requests)
            setTargetEndpoints(removeDynamicSegments(res?.paths))
            setEndpointPaths(res?.paths)
            setEndpointsTree(res?.endpointsTree)
        } catch (error) {
            setRequests([])
            setTargetEndpoints([])
            setEndpointPaths([])
            setEndpointsTree([])

        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        isLoading,
        requests,
        endpointPaths,
        endpointsTree,
        refetch,
    }
}
