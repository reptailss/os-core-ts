import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {LineChart} from '@mui/x-charts/LineChart';
import {formatNumber} from "@helpers/number/formatNumber";

import {sx} from './sx'
import Box from "@mui/material/Box";
import {useMedia} from "@hooks/useMedia";
import {GroupedByEndpointResult} from "@containers/requests/types/grouped";

const colorPalette = [
    "#69D2E7",
    "#E0E4CC",
    "#F38630",
    "#FE4365",
    "#FC9D9A",
    "#F9CDAD",
    "#83AF9B",
    "#ECD078",
    "#D95B43",
    "#C02942",
    "#542437",
    "#556270",
    "#4ECDC4",
    "#C7F464",
    "#FF6B6B",
    "#C44D58",
    "#E08E79",
    "#F1D4AF",
    "#C5E0DC",
    "#E8DDCB",
    "#CDB380",
    "#036564",
    "#490A3D",
    "#BD1550",
    "#E97F02",
    "#8A9B0F",
    "#594F4F",
    "#547980",
    "#9DE0AD",
    "#E5FCC2",
    "#00A0B0",
    "#6A4A3C",
];

interface Props {
    requestsGroupedByEndpoints: GroupedByEndpointResult,
}

export default function ChartGroupedByEndpoints({
                                                    requestsGroupedByEndpoints
                                                }: Props) {

    const {isDesktop} = useMedia()

    const data = React.useMemo(() => {
        return {
            seriesCounts: requestsGroupedByEndpoints?.groupedRequests?.map((group) => {
                return {
                    id: group.endpoint,
                    label: group.endpoint,
                    showMark: false,
                    curve: 'linear',
                    stack: 'total',
                    area: false,
                    stackOrder: 'ascending',
                    data: group.counts,
                }
            }),
            seriesResponseTimes: requestsGroupedByEndpoints?.groupedRequests?.map((group) => {
                return {
                    id: group.endpoint,
                    label: group.endpoint,
                    showMark: false,
                    curve: 'linear',
                    stack: 'total',
                    area: false,
                    stackOrder: 'ascending',
                    data: group.responseTimes,
                }
            }),
            xAxis: [
                {
                    scaleType: 'point',
                    data: requestsGroupedByEndpoints.allDays,
                    tickInterval: (index, i) => (i + 1) % 5 === 0,
                },
            ]
        }
    }, [requestsGroupedByEndpoints])

    const isWrap = !isDesktop || data?.seriesCounts?.length > 10 || data?.seriesResponseTimes?.length > 10

    return (
        <Card
            variant="outlined"
            sx={sx.root}
        >

            <CardContent>
                <Stack sx={sx.wrap}>
                    <Stack
                        direction="row"
                        sx={sx.inner}
                    >
                        <Typography
                            variant="h4"
                            component="p"
                        >
                            {formatNumber(requestsGroupedByEndpoints.grandTotal)}
                        </Typography>

                        <Chip size="small"
                              color="success"
                              label={` avg ${requestsGroupedByEndpoints.overallAverageResponseTime} ms`}
                        />

                    </Stack>
                </Stack>

                {!requestsGroupedByEndpoints?.groupedRequests?.length && <Typography>
                    Нічого не знайдено...
                </Typography>}

                <Stack
                    direction={'row'}
                    flexWrap={isWrap ? 'wrap' : 'nowrap'}
                    sx={sx.fullWidth}
                >
                    {data?.seriesCounts?.length >= 1 && <Box sx={sx.fullWidth}>
                        <Typography variant="caption" sx={sx.text}>
                            Кількість запитів
                        </Typography>

                        <LineChart
                            colors={colorPalette}
                            xAxis={data.xAxis as any}
                            series={data?.seriesCounts as any}
                            height={400}
                            margin={{left: 50, right: 20, top: 20, bottom: 20}}
                            grid={{horizontal: true}}
                            slotProps={{legend: {hidden: true,}}}
                        />
                    </Box>}


                    {data?.seriesResponseTimes?.length >= 1 && <Box sx={sx.fullWidth}>
                        <Typography variant="caption" sx={sx.text}>
                            Середній час виконання(avg) ms
                        </Typography>
                        <LineChart
                            colors={colorPalette}
                            xAxis={data.xAxis as any}
                            series={data?.seriesResponseTimes as any}
                            height={400}
                            margin={{left: 50, right: 20, top: 20, bottom: 20}}
                            grid={{horizontal: true}}
                            slotProps={{legend: {hidden: true,}}}
                        />
                    </Box>}
                </Stack>
            </CardContent>
        </Card>
    );
}
