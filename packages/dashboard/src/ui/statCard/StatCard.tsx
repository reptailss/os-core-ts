import * as React from 'react';
import Box from '@mui/material/Box';
import {SparkLineChart} from '@mui/x-charts/SparkLineChart';
import {areaElementClasses} from '@mui/x-charts/LineChart';
import {AreaGradientStatCard} from "@ui/statCard/AreaGradient";
import {StatCardInfo} from './types';
import CardCustom from "@ui/card/CardCustom";


const TREND_COLORS = {
    up: "#388e3c",
    down: "#d32f2f",
    neutral: "#616161"
}

const CHIP_COLORS = {
    up: 'green' as const,
    down: 'red' as const,
    neutral: 'gray' as const,
}

interface Props {
    statCard: StatCardInfo
}

export default function StatCard({
                                     statCard,
                                 }: Props) {

    const {
        title,
        trend,
        data,
        interval,
        value,
        days,
        trendValue,
    } = statCard

    const chartColor = TREND_COLORS[trend];

    return (
        <CardCustom
            title={title}
            subtitle={value}
            description={interval}
            chip={trendValue}
            chipColor={CHIP_COLORS[trend]}
        >
            {days?.length > 1 && <Box sx={{width: '100%', height: 50}}>
                <SparkLineChart
                    colors={[chartColor]}
                    data={data}
                    area
                    showHighlight
                    showTooltip
                    xAxis={{
                        scaleType: 'band',
                        data: days,
                    }}
                    sx={{
                        [`& .${areaElementClasses.root}`]: {
                            fill: `url(#area-gradient-${value})`,
                        },
                    }}
                >
                    <AreaGradientStatCard color={chartColor} id={`area-gradient-${value}`}/>
                </SparkLineChart>
            </Box>}
        </CardCustom>
    )
}
