import moment from 'moment'

export function getGroupKeyByGroupRow<T>({
                            item,
                            keyDate,
                            groupType,
                            inputDateFormat,
                        }: {
    item: T,
    keyDate: keyof T
    groupType: 'day' | 'month' | 'hours' | 'minutes'
    inputDateFormat?: string
    outputDateFormat?: string
}): string {
    const date = inputDateFormat ? moment(item[keyDate] as Date, inputDateFormat).toDate() : new Date(item[keyDate] as string);
    switch (groupType) {
        case 'day':
            return date?.toISOString()?.slice(0, 10);
        case 'month':
            return date?.toISOString()?.slice(0, 7);
        case 'hours':
            return date?.toISOString()?.slice(0, 13);
        case 'minutes':
            return date?.toISOString()?.slice(0, 16);
    }
}
