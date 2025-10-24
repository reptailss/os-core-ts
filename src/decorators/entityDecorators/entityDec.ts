import {DecoratorClass} from '@decorators/core'
import {EntityClass} from '@entity'

export function EntityDb(): DecoratorClass {
    return function(constructor) {
        const originalConstructor = constructor
        const newConstructor: any = function(...args: any[]) {
            const instance: EntityClass = new originalConstructor(...args)
            instance._columns = originalConstructor._columns || {}
            instance._primaryKey = originalConstructor._primaryKey || null
            instance._dateAdd = originalConstructor._dateAdd || null
            instance._dateUpdate = originalConstructor._dateUpdate || null
            return instance
        }
        newConstructor.prototype = originalConstructor.prototype
        return newConstructor
    }
}


