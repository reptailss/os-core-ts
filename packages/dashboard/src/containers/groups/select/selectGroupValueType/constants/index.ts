import {GroupValueType} from "@containers/groups/types";

export const GROUP_VALUE_TYPES: {
    value: GroupValueType,
    label: string
}[] = [
    {
        value: 'average',
        label: 'Середнє значення'
    },
    {
        value: 'min',
        label: 'Мінімальне значення'
    },
    {
        value: 'max',
        label: 'Максимальне значення'
    },
    {
        value: 'total',
        label: 'Сума'
    },
]