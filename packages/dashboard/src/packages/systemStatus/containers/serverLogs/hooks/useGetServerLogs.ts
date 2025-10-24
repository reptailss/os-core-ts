import {useCallback, useEffect, useState} from "react";

import {getLogsInitialDate} from "@containers/serverLogs/date/getLogsInitialDate";
import {ServerLog} from "@containers/serverLogs/types";
import {getSystemStatusServerLogs} from "@packages/systemStatus/containers/serverLogs/api/getServerLogs";

const {
    initialDateStart,
    initialDateEnd,
} = getLogsInitialDate()


export function useGetSystemStatusServerLogs(): {
    isLoading: boolean,
    refetch: (prop: {
        dateStart: Date,
        dateEnd: Date
    }) => Promise<void>,
    logs: ServerLog[],
} {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [logs, setLogs] = useState<ServerLog[]>([])

    useEffect(() => {
        const init = async () => {
            try {
                setIsLoading(true)
                const res = await getSystemStatusServerLogs({
                    dateStart: initialDateStart,
                    dateEnd: initialDateEnd,
                })
                setLogs(res)
            } catch (error) {
                setLogs([])
            } finally {
                setIsLoading(false)
            }
        }

        init()
    }, []);

    const refetch = useCallback(async ({
                                           dateEnd,
                                           dateStart,
                                       }: {
        dateStart: Date,
        dateEnd: Date
    }) => {
        try {
            setIsLoading(true)
            const res = await getSystemStatusServerLogs({
                dateEnd,
                dateStart,
            })
            setLogs(res)
        } catch (error) {
            setLogs([])
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        isLoading,
        logs,
        refetch,
    }
}
