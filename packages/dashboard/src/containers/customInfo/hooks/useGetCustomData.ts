import {useCallback, useEffect, useState} from "react";
import {CustomData} from "@containers/customInfo/types";
import {getCustomData} from "@containers/customInfo/api/getCustomInfo";

export function useGetCustomData({
                                     endpointPath,
                                 }: {
    endpointPath: string
}): {
    isLoading: boolean,
    refetch: () => Promise<void>,
    customData: CustomData | null,
} {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [customData, setCustomData] = useState<CustomData | null>(null)


    useEffect(() => {
        const init = async () => {
            setIsLoading(true)
            try {
                const res = await getCustomData({
                    endpointPath,
                })
                setCustomData(res)
            } catch (error) {
                setCustomData(null)
            }
            setIsLoading(false)
        }

        init()
    }, [])

    const refetch = useCallback(async () => {
        try {
            setIsLoading(true)
            const res = await getCustomData({
                endpointPath,
            })
            setCustomData(res)
        } catch (error) {
            setCustomData(null)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        isLoading,
        refetch,
        customData,
    }
}
