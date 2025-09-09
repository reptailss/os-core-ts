const OPERATOR_SUFFIXES = [
	'>',
	'<',
	'>=',
	'<=',
	'IN',
	'NOT',
	'NOT IN',
	'LIKE',
	'NOT LIKE'
] as const;

const NUMERIC_OPS = new Set(['>', '<', '>=', '<=']);
const STRING_OPS = new Set(['LIKE', 'NOT LIKE']);
const ARRAY_OPS = new Set(['IN', 'NOT IN']);
const UNIVERSAL_OPS = new Set(['NOT']);

type SchemaProperty = {
	type: string | string[];
	[key: string]: any;
};

function isType(prop: SchemaProperty, target: string): boolean {
	if (Array.isArray(prop.type)) return prop.type.includes(target);
	return prop.type === target;
}

type JSONSchemaType =
	| 'string'
	| 'number'
	| 'integer'
	| 'boolean'
	| 'array'
	| 'object'
	| 'null';
interface JSONSchema {
	type?: JSONSchemaType | JSONSchemaType[];
	format?: string;
	description?: string;
	enum?: any[];
	items?: JSONSchema;
	properties?: Record<string, JSONSchema>;
	required?: string[];
	additionalProperties?: boolean;
	[key: string]: any;
}

export function buildWhereSchema(schema: JSONSchema): JSONSchema {
	if (!schema.properties) return schema;
	
	const extendedProperties: Record<string, any> = {};
	
	for (const [key, value] of Object.entries<SchemaProperty>(schema.properties as any)) {
		extendedProperties[key] = value
		
		for (const op of OPERATOR_SUFFIXES) {
			const opKey = `${key} ${op}`
			if (
				(NUMERIC_OPS.has(op) && !isType(value, 'number') && !isType(value, 'integer')) ||
				(STRING_OPS.has(op) && !isType(value, 'string'))
			) {
				continue
			}
			
			if (ARRAY_OPS.has(op)) {
				extendedProperties[opKey] = {
					type: 'array',
					items: value
				};
			} else {
				extendedProperties[opKey] = value;
			}
		}
	}
	
	return {
		...schema,
		properties: extendedProperties
	};
}
