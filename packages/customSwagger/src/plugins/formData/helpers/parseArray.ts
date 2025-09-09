export const parseArrayFormData = (value: string): unknown => {
    try {
        if (value.startsWith('{') && value.endsWith('}')) {
            return JSON.parse(`[${value}]`)
        }

        if (value.startsWith('[{') && value.endsWith('}]')) {
            return JSON.parse(value)
        }

        return value
    } catch (error){
        return value
    }
}
