import JSON5 from 'json5'

export class GmObjectStringifyHelper {

    static  objectToString(obj: object):string {
        let jsonString = JSON5.stringify(obj)

        jsonString = jsonString.replace(/"([^"]+)":/g, '$1:').replace(/"([^"]+)"/g, '$1')

        return jsonString
    }

    static objectToStringWithoutValueQuotes(obj: object): string {
        let jsonString = JSON5.stringify(obj)

        jsonString = jsonString.replace(/(["'])[^"']*\1/g, match => match.slice(1, -1))

        jsonString = jsonString.replace(/"([^"\"]+)":/g, '$1:')

        jsonString = jsonString.replace(/(\b\w+\b):\1/g, '$1')

        return jsonString
    }

    static objectOptionsToString = (object: Record<string, unknown | object | (string[]) | undefined>, hasWrapper?: boolean) => {
        const res = Object.entries(object)?.map(([key, value]) => {
            if (typeof value === 'undefined') {
                return null
            }

            if (Array.isArray(value)) {
                return `${key}:${JSON.stringify(value)}`
            }
            return `${key}:${this.objectToStringWithoutValueQuotes(object[key] as object)}`
        })?.filter((val) => !!val)?.join(',')

        if (!res?.length) {
            return ''
        }

        if (hasWrapper === false) {
            return res
        }

        return `{${res}}`
    }

}