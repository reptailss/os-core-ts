import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'
import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'


export const QueryParams = <Value extends object = any>(
	schema: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>,
): DecoratorParam<
	Value
> => {
	return function(
		target,
		_propertyKey,
		_parameterIndex) {

		ControllerDecoratorsBuilder.addArgToMethod({
			target,
			_propertyKey,
			arg: {
				_parameterIndex,
				schema,
				key: 'QueryParams',
			},
		})
	}
}


