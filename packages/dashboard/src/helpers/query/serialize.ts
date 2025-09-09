import {ISerializeItem} from "@helpers/query/types";

export const serialize = function (obj?: ISerializeItem, prefix?: string): string {
    let str = [];
    let p;
    for (p in obj) {
        //@ts-ignore
        if (obj.hasOwnProperty(p)) {
            let k = prefix ? prefix + "[" + p + "]" : p;
            //@ts-ignore
            let v = obj[p];
            if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
                //@ts-ignore
                str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
            } else if (v !== null && typeof v === "object") {
                //@ts-ignore
                str.push(serialize(v, k));
            }
        }
    }
    return str.join("&");
};

