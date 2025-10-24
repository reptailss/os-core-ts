import {useCallback, useState} from "react";
import {SystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types";
import {getSystemStatusOsInfoLogs} from "@packages/systemStatus/containers/osInfoLogs/api/getSystemStatusOsInfoLogs";
import {GetSystemOsLogs, GetSystemStatusOsLogsProps} from "@packages/systemStatus/containers/osInfoLogs/types/getLogs";


export function useGetSystemStatusOsLogs(): {
    isLoading: boolean,
    systemOsLogs: SystemOsLog[],
    getSystemOsInfoLogs: GetSystemOsLogs,
    totalPage: number
} {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [systemOsLogs, setSystemOsLogs] = useState<SystemOsLog[]>([])
    const [totalPage, setTotalPage] = useState<number>(1)

    const getSystemOsInfoLogs = useCallback(async (props: GetSystemStatusOsLogsProps): Promise<SystemOsLog[]> => {
        try {
            setIsLoading(true)
            const res = await getSystemStatusOsInfoLogs(props)
            setTotalPage(res?.all_pages)
            setSystemOsLogs(res?.rows)
            setIsLoading(false)
            return res?.rows
        } catch (error) {
            setSystemOsLogs([])
            setIsLoading(false)
            return []
        }
    }, [])
    return {
        isLoading,
        systemOsLogs,
        totalPage,
        getSystemOsInfoLogs,
    }
}
