import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'


export const LegalEntityIdByDomain = (): DecoratorParam<number> => {
    return (target, _propertyKey, _parameterIndex) => {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'LegalEntityIdByDomain',
            },
        })
    }
}