export function convertGroupKeyToDate(
    groupKey: string,
    groupType: 'day' | 'month' | 'hours' | 'minutes'
): Date {
    switch (groupType) {
        case 'day': {
            const year = parseInt(groupKey.slice(0, 4));
            const month = parseInt(groupKey.slice(5, 7)) - 1;
            const day = parseInt(groupKey.slice(8, 10));
            return new Date(Date.UTC(year, month, day));
        }

        case 'month': {
            const year = parseInt(groupKey.slice(0, 4));
            const month = parseInt(groupKey.slice(5, 7)) - 1;
            return new Date(Date.UTC(year, month, 1));
        }

        case 'hours': {
            const year = parseInt(groupKey.slice(0, 4));
            const month = parseInt(groupKey.slice(5, 7)) - 1;
            const day = parseInt(groupKey.slice(8, 10));
            const hours = parseInt(groupKey.slice(11, 13));
            return new Date(Date.UTC(year, month, day, hours));
        }

        case 'minutes': {
            const year = parseInt(groupKey.slice(0, 4));
            const month = parseInt(groupKey.slice(5, 7)) - 1;
            const day = parseInt(groupKey.slice(8, 10));
            const hours = parseInt(groupKey.slice(11, 13));
            const minutes = parseInt(groupKey.slice(14, 16));
            return new Date(Date.UTC(year, month, day, hours, minutes));
        }
    }
}