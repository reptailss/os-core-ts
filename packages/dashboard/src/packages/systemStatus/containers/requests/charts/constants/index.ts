import {LineChartColumn} from "@ui/customLineChart/types";
import {ServerMeta} from "@containers/requests/types/meta";

export const SYSTEM_STATUS_REQUESTS_CHARTS_COLUMNS: LineChartColumn<ServerMeta>[] = [
    {
        key: 'response_time',
        label: 'response time',
        valueType: 'average',
        hide: false,
        color: '#FFC0CB'
    },
];
