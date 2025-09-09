import {useMemo} from "react";
import {ChartData, ChartDataset, ChartOptions} from "chart.js";
import {GroupRow, GroupType} from "@containers/groups/types";
import {calcGroupDataByTimeType} from "@containers/groups/helpers/calcGroupDataByTimeType";
import {LineChartColumn} from "@ui/customLineChart/types";
import {getLineChartTimeFormatByGroupType} from "@ui/customLineChart/helpers/getTimeFormatByGroupType";

export function useGetCustomChartOptions<Row extends { date: Date }>({
                                                                         columns,
                                                                         data,
                                                                         groupType,
                                                                     }: {
    columns: LineChartColumn<Row>[],
    data: GroupRow<Row>[]
    groupType: GroupType
}): { data: ChartData<"line", any>; options: ChartOptions<'line'> } {
    return useMemo(() => {
        const currentColumns = columns?.filter((col) => !col.hide)
        const groupData = calcGroupDataByTimeType({
            data: data,
            groupColumns: currentColumns?.map((col) => col.key),
            groupType,
        })
        const datasets: ChartDataset<"line", any>[] = currentColumns.map((col) => ({
            label: col.label,
            data: groupData.map((item) => ({
                x: item.groupDate,
                y: item[col.key][col.valueType],
            })),
            backgroundColor: col.color,
            borderColor: col.color,
        }));
        return {
            data: {
                datasets: datasets,
            },
            options: {
                responsive: true,
                animation: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            parser:getLineChartTimeFormatByGroupType(groupType),
                            tooltipFormat:getLineChartTimeFormatByGroupType(groupType),
                        },
                    }
                }
            },
        };
    }, [data, columns, groupType]);
}
