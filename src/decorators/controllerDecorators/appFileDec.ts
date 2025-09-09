import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {AppFile} from '@files'


export const AppFileDec = <Row extends object = any>({
                                                         fileKey,
                                                         formats,
                                                         required,
                                                     }: {
    fileKey?: string
    formats?: string[]
    required?: boolean
} = {}): DecoratorParam<
    AppFile | undefined
> => {
    return function(
        target,
        _propertyKey,
        _parameterIndex,
    ) {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'AppFile',
                fileKey,
                formats,
                required,
            },
        })
    }
}


export const DeleteOldFileIfNullDec = ({
                                           fileKey,
                                       }: {
    fileKey?: string,
} = {}): DecoratorParam<
    boolean
> => {
    return function(
        target,
        _propertyKey,
        _parameterIndex,
    ) {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'DeleteOldFileIfNull',
                fileKey,
            },
        })
    }
}


export const AppFilesDec = <Row extends object = any>({
                                                          formats,
                                                          maxCount,
                                                          minCount,
                                                          fileKey,
                                                      }: {
    fileKey?: string
    maxCount?: number
    minCount?: number
    formats?: string[]
}): DecoratorParam<
    AppFile[]
> => {
    return function(
        target,
        _propertyKey,
        _parameterIndex,
    ) {

        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'AppFiles',
                formats,
                maxCount,
                minCount,
                fileKey,
            },
        })
    }
}
