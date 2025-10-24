import {DefinitionsSwagger, DefinitionSwagger, SpecSwagger} from "@spec/types";
import {ParameterSwagger, PropertiesSwagger, PropertyTypeSwagger} from "@spec/types/paths";


const replaceArrayTypeType = (def: DefinitionSwagger) => {
	
	if (def.type === 'object' && def?.properties) {
		const newProperties: PropertiesSwagger = {}
		for (const propKey in def.properties) {
			const res = replaceArrayTypeType(def.properties[propKey])
			newProperties[propKey] = res
		}
		return {
			...def,
			properties: newProperties
		}
	}
	
	if (def?.items) {
		return {
			...def,
			items: replaceArrayTypeType(def.items)
		}
	}
	if (def.allOf && def.allOf?.length >= 1) {
		return {
			...def,
			allOf: def.allOf.map((childDef) => {
				return replaceArrayTypeType(childDef)
			})
		}
	}
	if (def.oneOf && def.oneOf?.length >= 1) {
		return {
			...def,
			oneOf: def.oneOf.map((childDef) => {
				return replaceArrayTypeType(childDef)
			})
		}
	}
	
	if (def.anyOf && def.anyOf?.length >= 1) {
		return {
			...def,
			anyOf: def.anyOf.map((childDef) => {
				return replaceArrayTypeType(childDef)
			})
		}
	}
	
	
	if (def.type && Array.isArray(def.type) && def.type.length) {
		const oneOf: {
			type: PropertyTypeSwagger
		} [] = []
		const newType: any = []
		
		if (def.type.length === 2 && def.type.includes('null')) {
			const currentType = def.type.find((type) => type !== 'null')
			if (currentType && typeof currentType === 'string') {
				return {
					...def,
					type: currentType,
					nulleable: true
				}
			}
			
		}
		def.type.forEach(type => {
			if (typeof type !== "string") {
				newType.push(type)
				return
			}
			oneOf.push({
				type: type as PropertyTypeSwagger
			})
		})
		
		if (!newType?.length) {
			delete def.type
			return {
				...def,
				oneOf,
			}
		}
		return {
			...def,
			oneOf,
			type: newType
			
		}
		
	}
	return def
}


const replaceParamArray = (param: ParameterSwagger) => {
	if (param?.schema) {
		return {
			...param,
			schema: replaceArrayTypeType(param.schema)
		}
	}
	
	if (param?.items) {
		return {
			...param,
			items: replaceArrayTypeType(param.items as any)
		}
	}
	if (!Array.isArray(param.type)) {
		return param
	}
	
	const withoutNull = param.type.filter((type) => type !== 'null')
	return {
		...param,
		type: withoutNull[0] || 'null'
	}
}
export const replaceArrayTypeToOneOf = (swagger: SpecSwagger) => {
	
	const newDefinitionsSwagger: DefinitionsSwagger = {}
	
	for (const key in swagger.definitions) {
		newDefinitionsSwagger[key] = replaceArrayTypeType(swagger.definitions[key])
	}
	
	for (const path in swagger.paths) {
		const endpoints = swagger.paths[path]
		for (const key in endpoints) {
			const endpoint = endpoints[key]
			if (endpoint?.parameters?.length) {
				endpoint.parameters = endpoint.parameters.map((param) => {
					return replaceParamArray(param)
				})
			}
			if (endpoint?.responses['200']?.schema) {
				endpoint.responses['200'].schema = replaceArrayTypeType(endpoint?.responses['200'].schema)
			}
		}
		
	}
	return {
		...swagger,
		definitions: newDefinitionsSwagger
	}
}