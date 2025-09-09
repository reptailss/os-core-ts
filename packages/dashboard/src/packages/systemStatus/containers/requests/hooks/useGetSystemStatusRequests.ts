import {useCallback, useState} from "react";
import {TransformServerMeta} from "@containers/requests/types/transform";
import {getSystemStatusRequests} from "@packages/systemStatus/containers/requests/api/getRequests";
import {transformRequestsData} from "@containers/requests/helpers/transformRequestsData";
import {GetSystemStatusRequest} from "@packages/systemStatus/containers/requests/types/events";


export function useGetSystemStatusRequests(): {
    isLoading: boolean,
    requests: TransformServerMeta[],
    getRequests: GetSystemStatusRequest,
    totalPage: number
} {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [requests, setRequests] = useState<TransformServerMeta[]>([])
    const [totalPage, setTotalPage] = useState<number>(1)

    const getRequests: GetSystemStatusRequest = useCallback(async (props) => {
        try {
            setIsLoading(true)
            const res = await getSystemStatusRequests(props)
            setTotalPage(res?.all_pages)
            const serverRequests = transformRequestsData(res)
            setRequests(serverRequests?.requests)
            setIsLoading(false)
            return serverRequests?.requests
        } catch (error) {
            setRequests([])
            setIsLoading(false)
            return []
        }
    }, [])


    return {
        isLoading,
        requests,
        totalPage,
        getRequests,
    }
}
