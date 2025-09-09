import {convertObj} from "swagger2openapi";
import {SpecSwagger} from "../types";
import {filterDefinitionsFromPaths} from "@spec/helpers/filterDefinitions";
import {replaceArrayTypeToOneOf} from "@spec/helpers/replaceArrayTypeToOneOfAndTransformParams";

export const transformSwagger = (swagger: SpecSwagger): Promise<SpecSwagger> => {

    const newSwagger: SpecSwagger = JSON.parse(JSON.stringify(swagger))
    newSwagger.definitions = filterDefinitionsFromPaths({
        definitions: swagger.definitions,
        paths: swagger.paths,
    })
    for (const path in newSwagger.paths) {
        const endpoints = newSwagger.paths[path]
        for (const key in endpoints) {
            const endpoint = endpoints[key]
            for (const statusCode in endpoint.responses) {
                const response = endpoint.responses[statusCode]
                if (!response?.description) {
                    response.description = ''
                }
            }
        }
    }
    for (const key in newSwagger.definitions) {
        if (Array.isArray(newSwagger.definitions[key])) {
            delete newSwagger.definitions[key]
        }
    }
    const swaggerArrayTypesReplace = replaceArrayTypeToOneOf(newSwagger)

    return new Promise((resolve, reject) => {
        convertObj(swaggerArrayTypesReplace as any, {}, (error, options) => {
            if (error) {
                console.log(error, 'error')
                resolve(swagger)
                return
            }
            resolve(options.openapi as any as SpecSwagger)
        })
    })
}
