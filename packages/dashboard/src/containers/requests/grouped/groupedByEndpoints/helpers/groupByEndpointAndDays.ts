import {formatDateToDDMMYYYY} from "@helpers/date/formatDateToDDMMYYYY";
import {formatNumber} from "@helpers/number/formatNumber";
import {GroupedByEndpointResult} from "../../../types/grouped";
import {TransformServerMeta} from "@containers/requests/types/transform";

export function groupByEndpointAndDays(requests: TransformServerMeta[]): GroupedByEndpointResult {

    if (!requests?.length) {
        return {
            allDays: [],
            groupedRequests: [],
            overallAverageResponseTime: 0,
            grandTotal: 0,
        }
    }


    const grouped = new Map<string, { dayMap: Map<string, number>; responseTimes: Map<string, number[]> }>();
    const allDaysSet = new Set<string>();
    let grandTotal = 0;
    let totalResponseTime = 0;
    let totalResponses = 0;


    requests.forEach((request) => {
        const endpoint = request?.__endpoint;
        const responseTime = request?.response_time;
        const date = new Date(request?.date);
        const day = formatDateToDDMMYYYY(date);

        allDaysSet.add(day);

        if (!grouped.has(endpoint)) {
            grouped.set(endpoint, {dayMap: new Map(), responseTimes: new Map()});
        }

        const {dayMap, responseTimes} = grouped.get(endpoint)!;

        if (dayMap.has(day)) {
            dayMap.set(day, dayMap.get(day)! + 1);
        } else {
            dayMap.set(day, 1);
        }

        if (typeof responseTime === 'number') {
            if (!responseTimes.has(day)) {
                responseTimes.set(day, []);
            }
            responseTimes.get(day)!.push(responseTime);
            totalResponseTime += responseTime;
            totalResponses++;
        }
    });

    const allDays = Array.from(allDaysSet).sort((a, b) => {
        const [dayA, monthA, yearA] = a.split('-').map(Number);
        const [dayB, monthB, yearB] = b.split('-').map(Number);
        return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime();
    });


    const groupedRequests = Array.from(grouped.entries())
        .map(([endpoint, {dayMap, responseTimes}]) => {
            const counts = allDays.map((day) => dayMap.get(day) ?? 0);

            const dailyResponseTimes = allDays.map((day) => {
                const times = responseTimes.get(day) ?? [];
                const averageTime = times.length
                    ? Math.round(times.reduce((sum, time) => sum + time, 0) / times.length)
                    : 0;
                return averageTime;
            });

            const total = counts.reduce((sum, count) => sum + count, 0);
            const totalFormatted = formatNumber(total);

            grandTotal += total;

            const averageResponseTime = dailyResponseTimes.reduce((sum, time) => sum + time, 0) / dailyResponseTimes.length;

            return {
                endpoint,
                days: allDays,
                counts,
                total,
                totalFormatted,
                averageResponseTime,
                responseTimes: dailyResponseTimes,
            };
        })
        .sort((a, b) => a.endpoint.localeCompare(b.endpoint)); // Сортуємо за endpoint

    const overallAverageResponseTime = totalResponses
        ? Math.round(totalResponseTime / totalResponses)
        : 0;

    return {
        groupedRequests,
        grandTotal,
        overallAverageResponseTime,
        allDays,
    };
}
