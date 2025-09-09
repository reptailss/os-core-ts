import React, {ReactNode, useState} from 'react';
import {useGetCustomChartOptions} from "@ui/customLineChart/hooks/useGetCustomChartOptions";
import {Line} from "react-chartjs-2";
import 'chartjs-adapter-moment';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from 'chart.js';
import Grid2 from '@mui/material/Grid2';
import {Button, Divider} from "@mui/material";
import {sx} from './sx'
import {GroupRow, GroupType} from "@containers/groups/types";
import MutateGroupColumns from "@containers/groups/columns/MutateGroupColumns";
import {LineChartColumn} from "@ui/customLineChart/types";
import SelectGroupType from "@containers/groups/select/selectGroupType/SelectGroupType";
import {classNames} from "@helpers/classNames";

ChartJS.register(
    TimeScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);


interface Props<Row extends { date: Date }> {
    initialColumns: LineChartColumn<Row>[],
    data: GroupRow<Row>[],
    sidebarChildren?:ReactNode
    disableStickyBtn?: boolean,
}

function CustomLineChart<Row extends { date: Date }>({
                                                         initialColumns,
                                                         data,
                                                         sidebarChildren,
                                                         disableStickyBtn,
                                                     }: Props<Row>) {

    const [columns, setColumns] = useState<LineChartColumn<Row>[]>(initialColumns)
    const [targetColumns, setTargetColumns] = useState<LineChartColumn<Row>[]>(initialColumns)

    const [groupType, setGroupType] = useState<GroupType>('hours')
    const [targetGroupType, setTargetGroupType] = useState<GroupType>('hours')

    const {
        data: chartData,
        options: chartOptions
    } = useGetCustomChartOptions({
        data,
        columns: targetColumns,
        groupType: targetGroupType,
    });

    const onSave = () => {
        setTargetColumns(columns)
        setTargetGroupType(groupType)
    }
    return (
        <Grid2
            sx={sx.root}
            container
            alignItems={'center'}
        >
            <Grid2
                size={{
                    xs: 12,
                    lg: 9
                }}
                sx={sx.chartContainer}
            >
                <Line
                    data={chartData}
                    options={chartOptions}
                />

            </Grid2>
            <Grid2
                size={{
                    xs: 12,
                    lg: 3
                }}
                sx={sx.sidebar}
            >
                {sidebarChildren && sidebarChildren}

                <SelectGroupType
                    value={groupType}
                    onChange={setGroupType}
                />

                <Divider/>

                <MutateGroupColumns
                    columns={columns}
                    setColumns={setColumns}
                />

                <Button
                    sx={sx.sidebarBtn}
                    onClick={onSave}
                    variant="contained"
                    fullWidth
                    className={classNames(disableStickyBtn && 'disableStickyBtn')}
                >
                    Зберегти
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default CustomLineChart;