export function convertArrayToObj<T, K extends keyof T>({
                                                            arr,
                                                            key,
                                                            generateKeyCallback
                                                        }: {
    arr: T[];
    key: K;
    generateKeyCallback?: (data: T) => string
}): Record<string, T> {
    const result: Record<string, T> = {};
    for (const item of arr) {
        const keyValue = generateKeyCallback ? generateKeyCallback(item) : String(item[key]);
        if (result[keyValue]) {
            continue
        }
        result[keyValue] = item;
    }
    return result;
}


export const parseJson = (json:string)=>{
    try {
        return JSON.parse(json)
    }catch (e){

    }

}