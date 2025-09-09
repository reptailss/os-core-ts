import {ServerMeta} from "@containers/requests/types/meta";

export interface TransformServerMeta extends ServerMeta{
    __dateFormat:string
    __id:string
    __endpoint:string
}