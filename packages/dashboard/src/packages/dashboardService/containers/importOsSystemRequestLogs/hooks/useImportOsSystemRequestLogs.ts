import {useState} from 'react'
import {ResultImportOsSystemRequests} from "@packages/dashboardService/containers/importOsSystemRequestLogs/types";
import {
    importOsSystemRequestLogs
} from "@packages/dashboardService/containers/importOsSystemRequestLogs/api/importOsSystemRequestLogs";


export function useImportOsSystemRequestLogs(): {
    isPending: boolean,
    isError: boolean,
    result: ResultImportOsSystemRequests | null,
    onImport: () => Promise<void>
    reset: () => void
} {
    const [isPending, setIsPending] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [result, setResult] = useState<ResultImportOsSystemRequests | null>(null)

    const onImport = async () => {
        try {
            setIsPending(true)
            const result = await importOsSystemRequestLogs()
            setResult(result)
            setIsPending(false)
            setIsError(false)
        } catch (error) {
            setResult(null)
            setIsPending(false)
            setIsError(true)
        }
    }

    const reset = ()=>{
        setResult(null)
        setIsPending(false)
        setIsError(false)
    }

    return {
        isPending,
        result,
        onImport,
        isError,
        reset
    }
}
