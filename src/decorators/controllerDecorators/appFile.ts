import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {IAppFile} from '@files'


export const AppFile = ({
                                                         fileKey,
                                                         formats,
                                                         required,
                                                     }: {
    fileKey: string
    formats?: string[]
    required?: boolean
}): DecoratorParam<
    IAppFile | undefined
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


export const DeleteOldFileIfNull = ({
                                           fileKey,
                                       }: {
    fileKey: string,
}): DecoratorParam<
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


export const AppFiles = <Row extends object = any>({
                                                          formats,
                                                          maxCount,
                                                          minCount,
                                                          fileKey,
                                                      }: {
    fileKey: string
    maxCount?: number
    minCount?: number
    formats?: string[]
}): DecoratorParam<
    IAppFile[]
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
