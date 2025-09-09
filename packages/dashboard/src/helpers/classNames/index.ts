export function classNames(...args: (string | number |  boolean  | undefined| Record<string, any> | any[])[]): string {
    const classes: string[] = [];

    for (const arg of args) {
        if (!arg) continue;

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(String(arg));
        } else if (Array.isArray(arg)) {
            if (arg.length) {
                const inner = classNames(...arg);
                if (inner) {
                    classes.push(inner);
                }
            }
        } else if (argType === 'object') {
            if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
                classes.push(arg.toString());
                continue;
            }
            //@ts-ignore
            for (const key in arg) {
                //@ts-ignore
                if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
}
