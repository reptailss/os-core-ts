import moment from "moment";
import {ServerRequests, ServerRequestsData} from "../types";
import {getTreeEndpoints} from "./getTreeEndpoints";
import {getRandomString} from "@helpers/string/getRandomString";
import {TransformServerMeta} from "@containers/requests/types/transform";

export const transformRequestsData = (data: ServerRequestsData): ServerRequests => {
    if (!data?.rows?.length) {
        return {
            requests: [],
            paths: [],
            endpointsTree: []
        }
    }

    const transformServerMeta: TransformServerMeta[] = []
    const pathsMap: Record<string, boolean> = {}
    if (data?.rows?.length >= 1) {
        data.rows.forEach((meta) => {
            const routePath = meta.route_path || '/unknown_route'
            const pathKey = `/${meta.service_key || ''}${routePath}`
            pathsMap[pathKey] = true
            transformServerMeta.push({
                ...meta,
                __id: getRandomString(),
                __dateFormat: moment(meta.date).format("DD-MM-YYYY HH:mm:ss"),
                __endpoint:pathKey,
                route_path:routePath
            })
        })
    }
    const paths: string[] = Object.keys(pathsMap)
    return {
        requests: transformServerMeta,
        paths,
        endpointsTree: getTreeEndpoints(paths),
    };
}
