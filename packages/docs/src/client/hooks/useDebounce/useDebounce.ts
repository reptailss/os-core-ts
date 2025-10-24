import {useEffect, useState} from 'react';


export function useDebounce<T>(
    {
        value,
        delay,
        callback
    }: {
        value: T,
        delay?: number,
        callback?: (debouncedValue: T) => void
    }
) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (callback) {
                callback(value);
            }
            setDebouncedValue(value);
        }, delay ?? 500);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return {debouncedValue, setDebouncedValue};
}
