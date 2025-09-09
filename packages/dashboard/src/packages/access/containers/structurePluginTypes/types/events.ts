import {
    BodyAddStructurePluginType,
    BodyUpdateStructurePluginType,
    StructurePluginType
} from "@packages/access/containers/structurePluginTypes/types/index";

export type OnReadBtnClickStructurePluginType = (structurePluginType: StructurePluginType) => Promise<void>
export type OnDeleteBtnClickStructurePluginType = (structurePluginType: StructurePluginType) => Promise<void>
export type OnSaveStructurePluginType = (
    body: BodyAddStructurePluginType | BodyUpdateStructurePluginType
) => Promise<{
    api_key:string
    id:number
} | null>