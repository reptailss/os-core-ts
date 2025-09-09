import {useCallback, useState} from "react";
import {
    getGlobalServiceEndpointsApi
} from "@packages/access/containers/globalServiceEndpoints/api/getGlobalServiceEndpoints";
import {GlobalServiceEndpoints} from "@packages/access/containers/globalServiceEndpoints/types";
import {GetGlobalEndpoints} from "@packages/access/containers/globalServiceEndpoints/types/events";


export function useGetGlobalServiceEndpoints(): {
    isLoading: boolean
    globalServiceEndpointsList: GlobalServiceEndpoints[]
    getGlobalEndpoints: GetGlobalEndpoints
    totalPage: number
} {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [globalServiceEndpointsList, setGlobalServiceEndpointsList] = useState<GlobalServiceEndpoints[]>([])
    const [totalPage, setTotalPage] = useState<number>(1)

    const getGlobalEndpoints: GetGlobalEndpoints = useCallback(async (props) => {
        try {
            setIsLoading(true)
            const res = await getGlobalServiceEndpointsApi(props)
            setTotalPage(res?.all_pages || 1)
            setGlobalServiceEndpointsList(res?.rows || [])
            setIsLoading(false)
            return res?.rows
        } catch (error) {
            setGlobalServiceEndpointsList([])
            setIsLoading(false)
            setTotalPage(1)
            return []
        }
    }, [])


    return {
        isLoading,
        globalServiceEndpointsList,
        totalPage,
        getGlobalEndpoints,
    }
}
