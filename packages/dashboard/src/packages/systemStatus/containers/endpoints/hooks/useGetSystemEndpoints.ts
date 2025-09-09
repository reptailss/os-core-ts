import {useEffect, useState} from "react";
import {SystemEndpoint} from "@packages/systemStatus/containers/endpoints/types";
import {getSystemEndpoints} from "@packages/systemStatus/containers/endpoints/api/getSystemEndpoints";


export function useGetSystemEndpoints(): {
    isLoading: boolean,
    systemEndpoints: SystemEndpoint[],
} {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [systemEndpoints, setSystemEndpoints] = useState<SystemEndpoint[]>([])

    useEffect(() => {
        const init = async () => {
            try {
                setIsLoading(true)
                const res = await getSystemEndpoints()
                setSystemEndpoints(res?.rows || [])
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setSystemEndpoints([])
            }
        }

        init()
    }, []);
    return {
        isLoading,
        systemEndpoints,
    }
}
