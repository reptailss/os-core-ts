import {useCallback, useState} from "react";
import {getMobileAppLogsApi} from "@packages/mobileAppLogs/containers/mobileAppLogs/api/getMobileAppLogs";
import {MobileAppLog} from "@packages/mobileAppLogs/containers/mobileAppLogs/types";
import {GetMobileAppLogs} from "@packages/mobileAppLogs/containers/mobileAppLogs/types/events";


export function useGetMobileAppLogs(): {
    isLoading: boolean
    mobileAppLogs: MobileAppLog[]
    getMobileAppLogs: GetMobileAppLogs
    totalPage: number
} {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [mobileAppLogs, setMobileAppLogs] = useState<MobileAppLog[]>([])
    const [totalPage, setTotalPage] = useState<number>(1)

    const getMobileAppLogs: GetMobileAppLogs = useCallback(async (props): Promise<MobileAppLog[]> => {
        try {
            setIsLoading(true)
            const res = await getMobileAppLogsApi(props)
            setTotalPage(res?.all_pages || 1)
            setMobileAppLogs(res?.rows || [])
            setIsLoading(false)
            return res?.rows
        } catch (error) {
            setMobileAppLogs([])
            setIsLoading(false)
            setTotalPage(1)
            return []
        }
    }, [])


    return {
        isLoading,
        mobileAppLogs,
        totalPage,
        getMobileAppLogs,
    }
}
