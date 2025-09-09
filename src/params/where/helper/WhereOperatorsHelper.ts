import {PermittedWhereOperator} from '@params'


export class WhereOperatorsHelper {
    static parseOperatorAndKey<Row extends object>(str: string): {
        key: keyof Row
        operator: PermittedWhereOperator | null
    } {
        const array = str.split(' ')
        if (array.length > 1) {
            return {
                key: array[0] as keyof Row,
                operator: array[1] as PermittedWhereOperator,
            }
        }
        return {
            key: array[0] as keyof Row,
            operator: null,
        }
    }

}
