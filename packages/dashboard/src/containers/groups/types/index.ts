export type GroupValueType = 'average' | 'min' | 'max' | 'total'
export type GroupType = 'day' | 'month' | 'hours' | 'minutes'


export type GroupColumn<Row extends { date: Date }> = {
    label: string,
    key: keyof Row,
    color?: string
    valueType: GroupValueType,
    hide: boolean
}


export type GroupRow<Row extends { date: Date }> = Row & {
    date: Date
}