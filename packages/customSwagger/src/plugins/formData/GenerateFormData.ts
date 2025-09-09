import {objectToFormData} from './helpers/objectToFormData'
import {parseFormDataWithJSON} from './helpers/parseFormDataWithJSON'


export function GenerateFormDataCustomSwaggerPlugin({
                                          request,
                                          spec,
                                      }: {
    request: Request,
    spec: any
}): Request {

    if (request.body instanceof FormData) {
        const json = parseFormDataWithJSON({
            formData: request.body,
            request,
            spec,
        })
        const formData = objectToFormData(json, {
            indices: true,
            nullsAsUndefineds: false,
            booleansAsIntegers: false,
            allowEmptyArrays: false,
            noAttributesWithArrayNotation: false,
            noFilesWithArrayNotation: true,
            dotsForObjectNotation: false,
        })


        //@ts-ignore
        request.body = formData as any
    }
    return request
}
