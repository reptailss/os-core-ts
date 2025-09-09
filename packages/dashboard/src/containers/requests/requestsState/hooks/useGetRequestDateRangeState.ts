import {useState} from "react";
import {getRequestsInitialDate} from "@containers/requests/date/getRequestsInitialDate";
import {SetStateFn} from "@baseTypes/state";


const {
    initialDateStart,
    initialDateEnd,
} = getRequestsInitialDate()


export function useGetRequestDateRangeState():{
    dateStart: string
    dateEnd: string
    setDateStart: SetStateFn<string>
    setDateEnd: SetStateFn<string>
} {

    const [dateStart, setDateStart] = useState<string>(initialDateStart)
    const [dateEnd, setDateEnd] = useState<string>(initialDateEnd)

    return {
        dateStart,
        dateEnd,
        setDateStart,
        setDateEnd,
    }
}