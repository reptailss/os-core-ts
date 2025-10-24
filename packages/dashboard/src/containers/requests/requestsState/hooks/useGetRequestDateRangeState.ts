import {useState} from "react";
import {getRequestsInitialDate} from "@containers/requests/date/getRequestsInitialDate";
import {SetStateFn} from "@baseTypes/state";


const {
    initialDateStart,
    initialDateEnd,
} = getRequestsInitialDate()


export function useGetRequestDateRangeState():{
    dateStart: Date
    dateEnd: Date
    setDateStart: SetStateFn<Date>
    setDateEnd: SetStateFn<Date>
} {

    const [dateStart, setDateStart] = useState<Date>(initialDateStart)
    const [dateEnd, setDateEnd] = useState<Date>(initialDateEnd)

    return {
        dateStart,
        dateEnd,
        setDateStart,
        setDateEnd,
    }
}