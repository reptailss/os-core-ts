import {TransformServerMeta} from "@containers/requests/types/transform";
import {GetSystemStatusServerRequestsParams} from "@packages/systemStatus/containers/requests/types/index";

export type GetSystemStatusRequest = (props: GetSystemStatusServerRequestsParams)=>Promise<TransformServerMeta[]>