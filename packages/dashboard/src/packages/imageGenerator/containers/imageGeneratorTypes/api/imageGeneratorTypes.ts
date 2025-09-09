import {apiRequestWithAuth} from "@helpers/query/apiRequestWithAuth";
import {getRootApiUrl} from "@helpers/apiUrl/getRootApiUrl";
import {
    BodyAddImageGeneratorTemplateSetting,
    BodyUpdateImageGeneratorTemplateSetting,
    ResponseImageGeneratorTypes
} from "@packages/imageGenerator/containers/imageGeneratorTypes/types";
import {serialize} from "@helpers/query/serialize";

const baseUrl = `image-generation-types`

export const getImageGeneratorTypes = async (): Promise<ResponseImageGeneratorTypes> => {
    return await apiRequestWithAuth<ResponseImageGeneratorTypes>({
        url: `${getRootApiUrl()}${baseUrl}/list?` + serialize({
            page: 1,
            per_page: 0
        }),
        options: {
            method: 'GET',
        },
    })
}


export const addImageGeneratorTypes = async (body: BodyAddImageGeneratorTemplateSetting) => {
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

export const updateImageGeneratorTypes = async ({id, ...rest}: BodyUpdateImageGeneratorTemplateSetting) => {
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

export const deleteImageGeneratorTypes = async ({id}: { id: number }) => {
    return await apiRequestWithAuth({
        url: `${getRootApiUrl()}${baseUrl}/delete/${id}`,
        options: {
            method: 'DELETE',
        },
    })
}