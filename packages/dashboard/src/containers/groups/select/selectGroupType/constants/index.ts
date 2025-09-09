import {GroupType} from "@containers/groups/types";

export const GROUP_TYPES:{
    value:GroupType,
    label:string
}[] = [
    {
        value:'day',
        label:'Дні'
    },
    {
        value:'month',
        label:'Місяці'
    },
    {
        value:'hours',
        label:'Години'
    },
    {
        value:'minutes',
        label:'Хвилини'
    },
]