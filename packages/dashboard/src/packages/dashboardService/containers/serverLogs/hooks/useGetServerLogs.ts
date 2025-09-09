import {useCallback, useEffect, useState} from "react";

import {getLogsInitialDate} from "@containers/serverLogs/date/getLogsInitialDate";
import {ServerLog} from "@containers/serverLogs/types";
import {getDashboardServiceServerLogs} from "@packages/dashboardService/containers/serverLogs/api/getServerLogs";

const {
    initialDateStart,
    initialDateEnd,
} = getLogsInitialDate()


export function useGetDashboardServiceServerLogs(): {
    isLoading: boolean,
    refetch: (prop: {
        dateStart: string,
        dateEnd: string
    }) => Promise<void>,
    logs: ServerLog[],
} {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [logs, setLogs] = useState<ServerLog[]>([])

    useEffect(() => {


        const init = async () => {
            try {
                setIsLoading(true)
                const res = await getDashboardServiceServerLogs({
                    dateStart: initialDateStart,
                    dateEnd: initialDateEnd,
                })
                setLogs(res)
                setIsLoading(false)
            } catch (error) {
                setLogs([])
                setIsLoading(false)
            }
        }

        init()
    }, []);

    const refetch = useCallback(async ({
                                           dateEnd,
                                           dateStart,
                                       }: {
        dateStart: string,
        dateEnd: string
    }) => {
        try {
            setIsLoading(true)
            const res = await getDashboardServiceServerLogs({
                dateEnd,
                dateStart,
            })
            setLogs(res)
            setIsLoading(false)
        } catch (error) {
            setLogs([])
            setIsLoading(false)
        }
    }, [])

    return {
        isLoading,
        logs,
        refetch,
    }
}
