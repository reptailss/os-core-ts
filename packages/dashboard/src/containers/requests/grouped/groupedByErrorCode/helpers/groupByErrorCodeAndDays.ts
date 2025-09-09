import {formatNumber} from "@helpers/number/formatNumber";
import {ServerRequest} from "../../../types";
import {ServerRequestGroupedByErrorCode} from "../../../types/grouped";
import {formatDateToDDMMYYYY} from "@helpers/date/formatDateToDDMMYYYY";

export function groupByErrorCodeAndDays(requests: ServerRequest[]): ServerRequestGroupedByErrorCode[] {
    const grouped = new Map<string, { dayMap: Map<string, number>; responseTimes: number[] }>();

    requests.forEach((request) => {
        const errorCode = request?.meta?.res?.error_code;
        if (!errorCode) {
            return;
        }

        const responseTime = request?.meta?.responseTime;
        const date = new Date(request?.date);
        const day = formatDateToDDMMYYYY(date);

        if (!grouped.has(errorCode)) {
            grouped.set(errorCode, {dayMap: new Map(), responseTimes: []});
        }

        const {dayMap, responseTimes} = grouped.get(errorCode)!;

        if (dayMap.has(day)) {
            dayMap.set(day, dayMap.get(day)! + 1);
        } else {
            dayMap.set(day, 1);
        }
        if (typeof responseTime === "number") {
            responseTimes.push(responseTime);
        }
    });

    return Array.from(grouped.entries())
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
