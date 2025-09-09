import {PermittedWhereOperator} from '@params'

export const BASE_WHERE_OPERATORS: PermittedWhereOperator[] = [
    '>',
    '<',
    '>=',
    '<=',
    '=',
    'IN',
    'NOT',
    'NOT IN',
    'LIKE',
    'NOT LIKE',
]


export const BASE_WHERE_STRING_OPERATORS: PermittedWhereOperator[] = [
    '=',
    'IN',
    'NOT IN',
    'LIKE',
    'NOT LIKE',
    'NOT',
]

export const BASE_WHERE_NUMBER_OPERATORS: PermittedWhereOperator[] = [
    '>',
    '<',
    '>=',
    '<=',
    '=',
    'NOT',
    'IN',
    'NOT IN',
]

export const BASE_WHERE_DATE_OPERATORS: PermittedWhereOperator[] = [
    '>',
    '<',
    '>=',
    '<=',
    '=',
]