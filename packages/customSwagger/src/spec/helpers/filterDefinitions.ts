import {DefinitionsSwagger, DefinitionSwagger} from "@spec/types"
import {getRefFromPathSwagger, getRefPathKeySwagger} from "./getRefPath"
import {PathsSwagger} from "@spec/types/paths"


type Value = {
    $ref?: string,
    schema?: {
        $ref?: string
    }
    items?: Value,
    allOf?: Value[],
    anyOf?: Value[],
    properties?: Record<string, Value>
}


const getRef = (key: string, definitions: DefinitionsSwagger): DefinitionSwagger | null => {
    if (!(key in definitions)) {
        return null
    }
    return definitions[key]

}
const getRefsResult = (value: Value | Value[], definitions: DefinitionsSwagger): string[] => {
    const res: string[] = []

    if (Array.isArray(value)) {
        value.forEach((child) => {
            const childRes = getRefsResult(child, definitions)
            if (!childRes?.length) {
                return
            }
            res.push(...childRes)
        })
        return res
    }


    if (value.$ref) {
        res.push(value.$ref)
        const ref = getRef(getRefFromPathSwagger(value.$ref), definitions)
        if (ref) {
            const childRes = getRefsResult(ref, definitions)
            if (childRes.length >= 1) {
                res.push(...childRes)
            }
        }
    }

    if (value.schema) {
        const childRes = getRefsResult(value.schema, definitions)
        if (childRes?.length >= 1) {
            res.push(...childRes)
        }
    }

    if (value.items) {
        const childRes = getRefsResult(value.items, definitions)
        if (childRes?.length >= 1) {
            res.push(...childRes)
        }
    }

    if (value.allOf && value.allOf?.length >= 1) {
        value.allOf.forEach((child) => {
            const childRes = getRefsResult(child, definitions)
            if (!childRes?.length) {
                return
            }
            res.push(...childRes)
        })
    }
    if (value.anyOf && value.anyOf?.length >= 1) {
        value.anyOf.forEach((child) => {
            const childRes = getRefsResult(child, definitions)
            if (!childRes?.length) {
                return
            }
            res.push(...childRes)
        })
    }

    if (value.properties) {
        for (const key in value.properties) {
            const childRes = getRefsResult(value.properties[key], definitions)
            if (!childRes?.length) {
                continue
            }
            res.push(...childRes)
        }
    }
    return res
}

const getRefsFromPath = (paths: PathsSwagger, definitions: DefinitionsSwagger) => {
    if (!paths) {
        return []
    }
    const refs: string[] = []

    for (const endpoint in paths) {
        const operations = paths[endpoint]
        for (const operationKey in operations) {
            //@ts-ignore
            const operation: OperationSwagger = operations[operationKey] as OperationSwagger
            if (operation?.parameters?.length) {
                operation.parameters.forEach((params) => {
                    const paramsRefs = getRefsResult(params, definitions)
                    if (paramsRefs?.length >= 1) {
                        refs.push(...paramsRefs)
                    }

                })
            }
            if (operation?.responses) {
                for (const responseKey in operation.responses) {
                    const response = operation.responses[responseKey]
                    const responseRefs = getRefsResult(response, definitions)
                    if (responseRefs?.length >= 1) {
                        refs.push(...responseRefs)
                    }
                }
            }
        }
    }
    return [...new Set(refs)]
}

export function filterDefinitionsFromPaths({
                                               paths,
                                               definitions,
                                           }: {
    paths: PathsSwagger,
    definitions: DefinitionsSwagger,
}): DefinitionsSwagger {
    const newDefinitions: DefinitionsSwagger = {}

    const refs = getRefsFromPath(paths, definitions)

    for (const ref in definitions) {
        const refPath = getRefPathKeySwagger(ref)
        if (!refs.includes(refPath)) {
            continue
        }
        newDefinitions[ref] = definitions[ref]
    }

    return newDefinitions

}
