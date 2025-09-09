import {ErrorValue} from '@appError'
import {ErrorValidator} from '@validator/core'
import {ZodInvalidUnionIssue} from 'zod/lib/ZodError'
import {ZodIssue} from 'zod'


export class ValidatorErrorValuesHelper {

    static buildErrorValuesBySchema(errors: ErrorValidator): ErrorValue[] {
        if (!errors?.issues?.length) {
            return []
        }

        const res: ErrorValue[] = []

        errors.issues.forEach((error) => {
            if (error.code === 'invalid_union') {
                const errorValues = this.buildErrorUnion(error)
                if (errorValues.length >= 1) {
                    res.push(...errorValues)
                }
                return
            }

            const errorValue = this.buildErrorDefault(error)
            res.push(errorValue)
        })

        return res
    }


    private static buildErrorUnion(error: ZodInvalidUnionIssue): ErrorValue[] {
        if (!error?.unionErrors?.length) {
            return []
        }
        const res: ErrorValue[] = []
        const hasUnionErrors = error.unionErrors.length > 1

        if (hasUnionErrors) {
            res.push({
                key: error.path.join('.'),
                message: 'Should be one of the options:',
            })
        }

        error.unionErrors.forEach((error, index) => {
            const errorValues = this.buildErrorValuesBySchema(error)
            if (!errorValues?.length) {
                return
            }
            if (hasUnionErrors && index > 0) {
                res.push('or')
            }
            res.push(...errorValues)
        })

        return res
    }

    private static buildErrorDefault(error: ZodIssue): ErrorValue {
        const key = Array.isArray(error?.path) ? error.path.join('.') : error.path

        const keyMessage = key?.length >= 1 ? `${key}` : ''
        if (!keyMessage?.length) {
            return error.message
        }

        return {key: keyMessage, message: error.message}

    }
}