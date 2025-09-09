import {useCallback, useEffect, useState} from 'react'
import {LivenessResult, ReadinessResult} from "@containers/readiness/types";
import {getSystemStatusReadiness} from "@packages/systemStatus/containers/readiness/api/getReadiness";
import {getSystemStatusLiveness} from "@packages/systemStatus/containers/readiness/api/getLiveness";


export function useGetSystemStatusReadiness(): {
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
                const res = await getSystemStatusReadiness()
                setReadiness(res)
            } catch (error) {
                setReadiness(null)
            }

            try {
                const liveness = await getSystemStatusLiveness()
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
            const res = await getSystemStatusReadiness()
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
            const liveness = await getSystemStatusLiveness()
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
