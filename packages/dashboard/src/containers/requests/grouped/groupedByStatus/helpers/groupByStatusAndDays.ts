import {formatNumber} from "@helpers/number/formatNumber";
import {ServerRequest} from "../../../types";
import {ServerRequestGroupedByStatus} from "../../../types/grouped";
import {formatDateToDDMMYYYY} from "@helpers/date/formatDateToDDMMYYYY";



export function groupByStatusAndDays(requests: ServerRequest[]): ServerRequestGroupedByStatus[] {
    const grouped = new Map<number, { dayMap: Map<string, number>; responseTimes: number[] }>();

    requests.forEach((request) => {
        const statusCode = request?.meta?.res?.statusCode;
        const responseTime = request?.meta?.responseTime;
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
    });

    return Array.from(grouped.entries())
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
        .sort((a, b) => a.statusCode - b.statusCode); // Сортування за statusCode
}
