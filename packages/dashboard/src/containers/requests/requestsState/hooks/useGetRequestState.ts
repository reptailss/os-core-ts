import {useState} from "react";
import {RequestsState} from "@containers/requests/requestsState/types";

export function useGetRequestState({
                                       initialDateStart,
                                       initialDateEnd,
                                   }: {
    initialDateStart: Date,
    initialDateEnd: Date,
}): RequestsState {
    const [targetEndpoints, setTargetEndpoints] = useState<string[]>([])
    const [dateStartRequests, setDateStartRequests] = useState<Date>(initialDateStart)
    const [dateEndRequests, setDateEndRequests] = useState<Date>(initialDateEnd)


    return {
        targetEndpoints, setTargetEndpoints,
        dateStartRequests, setDateStartRequests,
        dateEndRequests, setDateEndRequests,
    }
}