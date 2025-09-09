import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'

export const LegalEntityIdByDomainDec: DecoratorParam<number> = (
    target,
    _propertyKey,
    _parameterIndex,
) => {
    ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            _parameterIndex,
            key: 'LegalEntityIdByDomain',
        },
    })

}

