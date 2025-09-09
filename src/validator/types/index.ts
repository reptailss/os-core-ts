import {ErrorValue} from '@appError'
import {ZodIssue} from 'zod'

export type SchemaValidatorType =
    'array' |
    'boolean' |
    'booleanNum' |
    'date' |
    'enum' |
    'literal' |
    'number' |
    'object' |
    'record' |
    'string' |
    'union' |
    'unknown'


export type ValidateResult<Data = any> = {
    errors: [],
    error: false,
    success: true,
    data: Data
} | {
    errors: ErrorValue[],
    error: true,
    success: false,
    data: null
}



type ErrorItemValidator = {
    path: (string | number)[],
    message: string,
    unionErrors?:any[]
}

export type ErrorValidator = {
    issues:ZodIssue[]
}
