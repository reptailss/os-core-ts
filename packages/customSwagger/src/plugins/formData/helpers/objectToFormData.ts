const initCfg = (value: unknown): boolean => (isUndefined(value) ? true : !!value)
const isUndefined = (value: unknown): value is undefined => value === undefined
const isNull = (value: unknown): value is null => value === null
const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'
const isObject = (value: unknown): value is Record<string, unknown> => value === Object(value)
const isArray = (value: unknown): value is unknown[] => Array.isArray(value)
const isDate = (value: unknown): value is Date => value instanceof Date

const isBlob = (value: unknown, isReactNative: boolean): boolean => {
    return isReactNative
        ? isObject(value) && !isUndefined((value as any).uri)
        : isObject(value) &&
        //@ts-ignore
        typeof (value as Blob).size === 'number' &&
        //@ts-ignore
        typeof (value as Blob).type === 'string' &&
        //@ts-ignore
        typeof (value as Blob).slice === 'function'
}




const isFile = (value: unknown, isReactNative: boolean): boolean => {
    return (
        isBlob(value, isReactNative) &&
        typeof (value as File).name === 'string' &&
        //@ts-ignore
        (isObject((value as File).lastModifiedDate) || typeof (value as File).lastModified === 'number')
    )
}

export const objectToFormData = (
    obj: any,
    cfg: Record<string, any> | undefined,
    fd?: FormData | undefined,
    pre?: string
): FormData => {
    cfg = cfg || {};
    fd = fd || new FormData();

    cfg.indices = initCfg(cfg?.indices);
    cfg.nullsAsUndefineds = initCfg(cfg?.nullsAsUndefineds);
    cfg.booleansAsIntegers = initCfg(cfg?.booleansAsIntegers);
    cfg.allowEmptyArrays = initCfg(cfg?.allowEmptyArrays);
    cfg.noAttributesWithArrayNotation = initCfg(cfg?.noAttributesWithArrayNotation);
    cfg.noFilesWithArrayNotation = initCfg(cfg?.noFilesWithArrayNotation);
    cfg.dotsForObjectNotation = initCfg(cfg?.dotsForObjectNotation);


    if (isUndefined(obj)) {
        return fd;
    } else if (isNull(obj)) {
        if (!cfg?.nullsAsUndefineds) {
            fd.append(pre!, "");
        }
    } else if (isBoolean(obj)) {
        fd.append(pre!, cfg?.booleansAsIntegers ? (obj ? "1" : "0") : String(obj));
    } else if (isArray(obj)) {
        if (obj.length) {
            obj.forEach((value, index) => {
                let key = `${pre}[${cfg?.indices ? index : ""}]`;

                if (
                    cfg?.noAttributesWithArrayNotation ||
                    (cfg?.noFilesWithArrayNotation && isFile(value, false))
                ) {
                    key = pre!;
                }

                objectToFormData(value, cfg, fd, key);
            });
        } else if (cfg?.allowEmptyArrays) {
            fd.append(cfg?.noAttributesWithArrayNotation ? pre! : `${pre}[]`, "");
        }
    } else if (isDate(obj)) {
        fd.append(pre!, obj.toISOString());
    } else if (isObject(obj) && !isBlob(obj, false)) {
        Object.keys(obj).forEach((prop) => {
            const value = obj[prop];

            let key = pre
                ? cfg?.dotsForObjectNotation
                    ? `${pre}.${prop}`
                    : `${pre}[${prop}]`
                : prop;

            objectToFormData(value, cfg, fd, key);
        });
    } else {
        fd.append(pre!, obj);
    }

    return fd;
};
