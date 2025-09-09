import {checkIsArrayFormDataParam} from './checkIsArrayFormDataParam'
import {parseArrayFormData} from "@plugins/formData/helpers/parseArray";

export const parseFormDataWithJSON = ({
                                          formData,
                                          request,
                                          spec,
                                      }: {
    formData: FormData,
    request: Request,
    spec: any,
}): Record<string, unknown> => {
    const parsedData: Record<string, unknown> = {}

    for (const [key, value] of formData.entries()) {
        let processedValue: unknown = value

        if (value instanceof File) {
            if (key in parsedData) {
                if (Array.isArray(parsedData[key])) {
                    (parsedData[key] as unknown[]).push(value)
                    continue
                }
                parsedData[key] = [parsedData[key], value]
                continue
            }
            parsedData[key] = processedValue
            continue
        }

        try {
            if (
                typeof value === 'string' &&
                ((value.startsWith('{') && value.endsWith('}')) ||
                    (value.startsWith('[{') && value.endsWith('}]'))) &&
                checkIsArrayFormDataParam({
                    key,
                    request,
                    spec,
                })
            ) {
                processedValue = parseArrayFormData(value)
            } else {
                processedValue = JSON.parse(value)
            }
        } catch (error) {
        }

        parsedData[key] = processedValue
    }

    return parsedData
}
