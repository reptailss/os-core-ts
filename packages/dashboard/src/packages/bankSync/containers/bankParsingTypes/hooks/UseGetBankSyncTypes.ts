import {useEffect, useState} from "react";
import {BankSyncParsingType} from "@packages/bankSync/containers/bankParsingTypes/types";
import {getBankSyncParsingTypes} from "@packages/bankSync/containers/bankParsingTypes/api/bankParsingTypes";


export function useGetBankSyncTypes(): {
    isLoading: boolean,
    bankSyncParsingTypes: BankSyncParsingType[],
    fetchTypes: () => Promise<void>
} {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [bankSyncParsingTypes, setBankSyncParsingTypes] = useState<BankSyncParsingType[]>([])


    const fetchTypes = async () => {
        try {
            setIsLoading(true)
            const res = await getBankSyncParsingTypes()
            setBankSyncParsingTypes(res?.rows || [])
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setBankSyncParsingTypes([])
        }
    }
    useEffect(() => {
        fetchTypes()
    }, []);
    return {
        isLoading,
        bankSyncParsingTypes,
        fetchTypes
    }
}
