import {formatNumber} from "@helpers/number/formatNumber";
import {ServerRequestGroupedByErrorCode, ServerRequestGroupedByStatus} from "../../../types/grouped";
import {formatDateToDDMMYYYY} from "@helpers/date/formatDateToDDMMYYYY";
import {ServerMeta} from "@containers/requests/types/meta";


export function groupByStatusAndErrorCode(requests: ServerMeta[]): {
    requestsGroupedByStatus: ServerRequestGroupedByStatus[],
    requestsGroupedByErrorCode: ServerRequestGroupedByErrorCode[],
} {
    const grouped = new Map<number, { dayMap: Map<string, number>; responseTimes: number[] }>();
    const groupedByErrorCode = new Map<string, { dayMap: Map<string, number>; responseTimes: number[] }>();

    requests.forEach((request) => {

        const statusCode = request?.response_status_code;
        const responseTime = request?.response_time;
        const date = new Date(request?.date);
        const day = formatDateToDDMMYYYY(date);

        if (!grouped.has(statusCode)) {
            grouped.set(statusCode, {dayMap: new Map(), responseTimes: []});
        }

        const {dayMap, responseTimes} = grouped.get(statusCode)!;

        if (dayMap.has(day)) {
            dayMap.set(day, dayMap.get(day)! + 1);
        } else {
            dayMap.set(day, 1);
        }
        if (typeof responseTime === 'number') {
            responseTimes.push(responseTime);
        }

        const errorCode = request?.error_code;

        if (errorCode) {
            if (!groupedByErrorCode.has(errorCode)) {
                groupedByErrorCode.set(errorCode, {dayMap: new Map(), responseTimes: []});
            }

            const {dayMap, responseTimes} = groupedByErrorCode.get(errorCode)!;

            if (dayMap.has(day)) {
                dayMap.set(day, dayMap.get(day)! + 1);
            } else {
                dayMap.set(day, 1);
            }
            if (typeof responseTime === "number") {
                responseTimes.push(responseTime);
            }
        }

    });

    return {
        requestsGroupedByStatus: Array.from(grouped.entries())
            .map(([statusCode, {dayMap, responseTimes}]) => {
                const days = Array.from(dayMap.keys());
                const counts = Array.from(dayMap.values());
                const total = counts.reduce((sum, count) => sum + count, 0);
                const totalFormatted = formatNumber(total);

                const averageResponseTime = Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length)

                return {
                    statusCode,
                    days,
                    counts,
                    total,
                    totalFormatted,
                    averageResponseTime,
                };
            })
            .sort((a, b) => a.statusCode - b.statusCode),
        requestsGroupedByErrorCode: Array.from(groupedByErrorCode.entries())
            .map(([errorCode, {dayMap, responseTimes}]) => {
                const days = Array.from(dayMap.keys());
                const counts = Array.from(dayMap.values());
                const total = counts.reduce((sum, count) => sum + count, 0);
                const totalFormatted = formatNumber(total);

                const averageResponseTime = Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length);

                return {
                    errorCode,
                    days,
                    counts,
                    total,
                    totalFormatted,
                    averageResponseTime,
                };
            })
    }
}
