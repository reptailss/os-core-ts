import {useCallback, useState} from "react";
import {getActionsLogsApi} from "@packages/actionsLogger/containers/actionsLogs/api/getActionsLogs";
import {ActionLog} from "@packages/actionsLogger/containers/actionsLogs/types";
import {GetActionsLogs} from "@packages/actionsLogger/containers/actionsLogs/types/events";


export function useGetActionsLogs(): {
    isLoading: boolean
    actionsLogs: ActionLog[]
    getActionsLogs: GetActionsLogs
    totalPage: number
} {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [actionsLogs, setActionsLogs] = useState<ActionLog[]>([])
    const [totalPage, setTotalPage] = useState<number>(1)

    const getActionsLogs: GetActionsLogs = useCallback(async (props): Promise<ActionLog[]> => {
        try {
            setIsLoading(true)
            const res = await getActionsLogsApi(props)
            setTotalPage(res?.all_pages || 1)
            setActionsLogs(res?.rows || [])
            setIsLoading(false)
            return res?.rows
        } catch (error) {
            setActionsLogs([])
            setIsLoading(false)
            setTotalPage(1)
            return []
        }
    }, [])


    return {
        isLoading,
        actionsLogs,
        totalPage,
        getActionsLogs,
    }
}
