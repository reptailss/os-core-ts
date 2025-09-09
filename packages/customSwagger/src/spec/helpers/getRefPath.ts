export const getRefPathSwagger = (refPath: string) => {
    if (!refPath.includes('/definitions/')) {
        return `#/definitions/${refPath.slice(1)}`
    }
    return refPath
}

export const getRefPathKeySwagger = (refPath: string) => {
    if (!refPath.includes('/definitions')) {
        return `#/definitions/${refPath}`
    }
    return refPath
}

export const getRefFromPathSwagger = (refPath: string) => {
    return refPath?.slice(14)
}