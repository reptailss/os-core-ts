import {useCallback, useEffect, useState} from 'react'
import {OsInfo} from '@containers/osInfo/types'
import {getDashboardServiceOsInfo} from "@packages/dashboardService/containers/osInfo/api/getOsInfo";


export function useGetDashboardServiceOsInfo(): {
    isLoading: boolean,
    refetch: () => Promise<void>,
    osInfo: OsInfo | null,
} {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [osInfo, setOsInfo] = useState<OsInfo | null>(null)

    useEffect(() => {


        const init = async () => {
            try {
                setIsLoading(true)
                const res = await getDashboardServiceOsInfo()
                setOsInfo(res)
            } catch (error) {
                setOsInfo(null)
            } finally {
                setIsLoading(false)
            }
        }

        init()
    }, [])

    const refetch = useCallback(async () => {
        try {
            setIsLoading(true)
            const res = await getDashboardServiceOsInfo()
            setOsInfo(res)
        } catch (error) {
            setOsInfo(null)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        isLoading,
        osInfo,
        refetch,
    }
}
