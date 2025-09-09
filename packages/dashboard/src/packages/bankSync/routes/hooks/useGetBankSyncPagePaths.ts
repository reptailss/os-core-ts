import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import {useMemo} from "react";
import {BANK_SYNC_TYPES_PAGE_PATH} from "@packages/bankSync/pages/bankSyncParsingTypes/constants";

export function useGetBankSyncPagePaths(): {
    parsingTypes: string
} {
    return useMemo(() => {
        const baseUrl = getRootRoutePath()
        return {
            parsingTypes: `${baseUrl}${BANK_SYNC_TYPES_PAGE_PATH}`,
        }
    }, [])
}