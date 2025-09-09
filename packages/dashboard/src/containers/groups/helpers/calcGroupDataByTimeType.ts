import moment from "moment";
import {getGroupKeyByGroupRow} from "@containers/groups/helpers/getGroupKeyByGroupRow";
import {convertGroupKeyToDate} from "@containers/groups/helpers/convertGroupKeyToDate";


type GroupingType = 'day' | 'month' | 'hours' | 'minutes';

type GroupRow<Row extends object> = {
    groupDate: string
} & GroupResult<Row>

type GroupResult<T extends object> = {
    [Key in keyof T]: CalcResult
}

type CalcResult = {
    min: number
    max: number
    average: number
    total: number
}

type GroupValueRow<Row extends object> = {
    groupDate: string
} & GroupValueResult<Row>

type GroupValueResult<T extends object> = {
    [Key in keyof T]: CalcValue
}

type CalcValue = {
    sum: number
    count: number
    min: number | null
    max: number | null
}

export const calcGroupDataByTimeType = <Row extends { date: Date }>({
                                                                        data,
                                                                        groupType,
                                                                        groupColumns,
                                                                        inputDateFormat,
                                                                        outputDateFormat,
                                                                    }: {
    data: Row[]
    groupColumns: (keyof Row)[]
    groupType: GroupingType
    inputDateFormat?: string
    outputDateFormat?: string
}): GroupRow<Row>[] => {
    const groupedData: Record<string, GroupValueRow<Row>> = data.reduce((groups, item) => {
        const formattedGroupKey = getGroupKeyByGroupRow({
            item,
            groupType,
            inputDateFormat,
            keyDate: 'date'
        });

        if (!groups[formattedGroupKey]) {
            groups[formattedGroupKey] = {
                groupDate: formattedGroupKey
            };
            groupColumns.forEach((col) => {
                if (typeof item[col] === 'number') {
                    groups[formattedGroupKey][col] = {
                        sum: 0,
                        count: 0,
                        min: null,
                        max: null
                    }
                }
            });
        }
        groupColumns.forEach((col) => {
            if (item[col] && typeof item[col] === 'number') {
                const colData = groups[formattedGroupKey][col]
                colData.sum += item[col] as number;
                colData.count += 1;
                if (!colData.max) {
                    colData.max = item[col]
                }
                if (!colData.min) {
                    colData.min = item[col]
                }
                if (item[col] >= colData.max) {
                    colData.max = item[col]
                }
                if (item[col] <= colData.min) {
                    colData.min = item[col]
                }
                groups[formattedGroupKey][col] = colData
            }
        });
        return groups;
    }, {});

    const result = Object.values(groupedData);

    result.sort((a, b) => {
        if (outputDateFormat) {
            const dateA = moment(convertGroupKeyToDate(a.groupDate, groupType));
            const dateB = moment(convertGroupKeyToDate(b.groupDate, groupType));
            return dateA.diff(dateB);
        } else {
            const dateA = new Date(a.groupDate);
            const dateB = new Date(b.groupDate);
            return dateA.getTime() - dateB.getTime();
        }
    });

    return result.map((item) => {
        const date = convertGroupKeyToDate(item.groupDate, groupType);
        const dateWithFormat = outputDateFormat ? moment(date).format(outputDateFormat) : date;
        const groupResult: GroupResult<Row> = {
            groupDate: dateWithFormat
        } as GroupResult<Row>
        groupColumns.forEach((col) => {
            const groupValue = item[col];
            const average = groupValue.sum > 0 ? groupValue.sum / groupValue.count : 0
            const min = groupValue.min || 0
            const max = groupValue.max || 0
            groupResult[col] = {
                max: Number(max.toFixed(2)),
                min: Number(min.toFixed(2)),
                total: Number(groupValue.sum.toFixed(2)),
                average: Number(average.toFixed(2))
            }
        })
        return groupResult as GroupRow<Row>;
    });
};
