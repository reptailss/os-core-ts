import {useState} from "react";
import {RequestsState} from "@containers/requests/requestsState/types";

export function useGetRequestState({
                                       initialDateStart,
                                       initialDateEnd,
                                   }: {
    initialDateStart: string,
    initialDateEnd: string,
}): RequestsState {
    const [targetEndpoints, setTargetEndpoints] = useState<string[]>([])
    const [dateStartRequests, setDateStartRequests] = useState<string>(initialDateStart)
    const [dateEndRequests, setDateEndRequests] = useState<string>(initialDateEnd)


    return {
        targetEndpoints, setTargetEndpoints,
        dateStartRequests, setDateStartRequests,
        dateEndRequests, setDateEndRequests,
    }
}