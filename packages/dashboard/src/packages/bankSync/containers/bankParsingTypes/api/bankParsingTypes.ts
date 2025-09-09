import {apiRequestWithAuth} from "@helpers/query/apiRequestWithAuth";
import {getRootApiUrl} from "@helpers/apiUrl/getRootApiUrl";
import {serialize} from "@helpers/query/serialize";
import {
    BodyAddBankSyncParsingType,
    BodyUpdateBankSyncParsingType,
    ResponseBankSyncParsingTypes
} from "@packages/bankSync/containers/bankParsingTypes/types";

const baseUrl = `bank-parsing-types`

export const getBankSyncParsingTypes = async (): Promise<ResponseBankSyncParsingTypes> => {
    return await apiRequestWithAuth<ResponseBankSyncParsingTypes>({
        url: `${getRootApiUrl()}${baseUrl}/list?` + serialize({
            page: 1,
            per_page: 0
        }),
        options: {
            method: 'GET',
        },
    })
}


export const addBankSyncParsingTypes = async (body: BodyAddBankSyncParsingType) => {
    return await apiRequestWithAuth({
        url: `${getRootApiUrl()}${baseUrl}/add`,
        options: {
            method: 'POST',
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify(body)
        },
    })
}

export const updateBankSyncParsingTypes = async ({id, ...rest}: BodyUpdateBankSyncParsingType) => {
    return await apiRequestWithAuth({
        url: `${getRootApiUrl()}${baseUrl}/update/${id}`,
        options: {
            method: 'PUT',
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify(rest)
        },
    })
}

export const deleteBankSyncParsingType = async ({id}: { id: number }) => {
    return await apiRequestWithAuth({
        url: `${getRootApiUrl()}${baseUrl}/delete/${id}`,
        options: {
            method: 'DELETE',
        },
    })
}