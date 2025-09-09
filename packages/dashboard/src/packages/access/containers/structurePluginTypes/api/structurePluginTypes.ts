import {apiRequestWithAuth} from "@helpers/query/apiRequestWithAuth";
import {getRootApiUrl} from "@helpers/apiUrl/getRootApiUrl";
import {serialize} from "@helpers/query/serialize";
import {
    BodyAddStructurePluginType,
    BodyUpdateStructurePluginType,
    ResponseStructurePluginTypes,
    ResultAddStructurePluginType
} from "@packages/access/containers/structurePluginTypes/types";


const baseUrl = `structure/plugin-types`

export const getStructurePluginTypes = async (): Promise<ResponseStructurePluginTypes> => {
    return await apiRequestWithAuth<ResponseStructurePluginTypes>({
        url: `${getRootApiUrl()}${baseUrl}/list?` + serialize({
            page: 1,
            per_page: 0
        }),
        options: {
            method: 'GET',
        },
    })
}


export const addStructurePluginTypes = async (body: BodyAddStructurePluginType): Promise<ResultAddStructurePluginType> => {
    return await apiRequestWithAuth<ResultAddStructurePluginType>({
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

export const updateStructurePluginTypes = async ({id, ...rest}: BodyUpdateStructurePluginType) => {
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

export const deleteStructurePluginType = async ({id}: { id: number }) => {
    return await apiRequestWithAuth({
        url: `${getRootApiUrl()}${baseUrl}/delete/${id}`,
        options: {
            method: 'DELETE',
        },
    })
}