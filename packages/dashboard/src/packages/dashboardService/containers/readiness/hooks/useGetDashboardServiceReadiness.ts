import {useCallback, useEffect, useState} from 'react'
import {LivenessResult, ReadinessResult} from "@containers/readiness/types";
import { getDashboardServiceLiveness } from '@packages/dashboardService/containers/readiness/api/getLiveness';
import {getDashboardServiceReadiness} from "@packages/dashboardService/containers/readiness/api/getReadiness";


export function useGetDashboardServiceReadiness(): {
    isLoading: boolean,
    refetchReadiness: () => Promise<void>,
    refetchLiveness: () => Promise<void>,
    readiness: ReadinessResult | null,
    liveness: LivenessResult | null,
} {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [readiness, setReadiness] = useState<ReadinessResult | null>(null)
    const [liveness, setLiveness] = useState<LivenessResult | null>(null)

    useEffect(() => {
        const init = async () => {
            setIsLoading(true)
            try {
                const res = await getDashboardServiceReadiness()
                setReadiness(res)
            } catch (error) {
                setReadiness(null)
            }

            try {
                const liveness = await getDashboardServiceLiveness()
                setLiveness(liveness)
            } catch (error) {
                setLiveness(null)
            }
            setIsLoading(false)
        }

        init()
    }, [])

    const refetchReadiness = useCallback(async () => {
        try {
            setIsLoading(true)
            const res = await getDashboardServiceReadiness()
            setReadiness(res)
        } catch (error) {
            setReadiness(null)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const refetchLiveness = useCallback(async () => {
        try {
            setIsLoading(true)
            const liveness = await getDashboardServiceLiveness()
            setLiveness(liveness)
        } catch (error) {
            setLiveness(null)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        isLoading,
        readiness,
        liveness,
        refetchReadiness,
        refetchLiveness,
    }
}
