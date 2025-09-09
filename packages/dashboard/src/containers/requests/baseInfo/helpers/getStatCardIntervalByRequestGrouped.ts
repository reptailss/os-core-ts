export const getStatCardIntervalByRequestGrouped = (days: string[]): string => {
    if (!days?.length) {
        return ''
    }
    if (days.length  === 1) {
        return days[0]
    }

    return `${days[0]} - ${days[days.length - 1]}`
}
