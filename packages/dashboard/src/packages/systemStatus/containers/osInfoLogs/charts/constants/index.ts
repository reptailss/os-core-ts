import {SystemOsLog} from "@packages/systemStatus/containers/osInfoLogs/types";
import {LineChartColumn} from "@ui/customLineChart/types";

export const SYSTEM_OS_INFO_CHARTS_COLUMNS: LineChartColumn<SystemOsLog>[] = [
    {
        key: 'ram_pr_used',
        label: 'ram pr used',
        valueType: 'average',
        hide: false,
        color: '#FFC0CB'
    },
    {
        key: 'ram_os_free',
        label: 'ram os free',
        valueType: 'average',
        hide: true,
        color: '#FFA500'
    },
    {
        key: 'ram_os_used',
        label: 'ram os used',
        valueType: 'average',
        hide: true,
        color: '#A52A2A'
    },
    {
        key: 'ram_os_total',
        label: 'ram os total',
        valueType: 'average',
        hide: true,
        color: '#800080'
    },
    {
        key: 'cpu_pr_used',
        label: 'cpu pr used',
        valueType: 'average',
        hide: true,
        color: '#0000FF'
    },
    {
        key: 'cpu_os_used',
        label: 'cpu os used',
        valueType: 'average',
        hide: true,
        color: '#FFFF00'
    },
    {
        key: 'cpu_cores',
        label: 'cpu cores',
        valueType: 'average',
        hide: true,
        color: '#FF0000'
    },
    {
        key: 'cpu_speed',
        label: 'cpu speed',
        valueType: 'average',
        hide: true,
        color: '#008000'
    },


];
