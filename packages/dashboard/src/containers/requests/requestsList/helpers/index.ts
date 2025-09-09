function descendingComparatorRequestsList<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

export function getComparatorRequestsList<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string | any },
    b: { [key in Key]: number | string | any },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparatorRequestsList(a, b, orderBy)
        : (a, b) => -descendingComparatorRequestsList(a, b, orderBy);
}
