import {getQueryParams} from "@helpers/searchParams";

export const getInitialPageParamServerLogs = ():number=>{
    const pageParam = getQueryParams('page')
    if(!pageParam || isNaN(Number(pageParam))){
        return 1
    }
    return  Number(pageParam)
}
