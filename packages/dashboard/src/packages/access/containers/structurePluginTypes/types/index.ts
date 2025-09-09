export type StructurePluginType = {
    id: number
    date_add: Date
    date_update: Date
    services: StructurePluginTypeService[]
    key: string
    legal_entity_id: number
    active: 0 | 1
}

export type StructurePluginTypeService = {
    service_key: string
    has_all_access: 0 | 1
    endpoints: Record<string, 0 | 1>
}


export interface BodyAddStructurePluginType {
    services: StructurePluginTypeService[]
    key: string
    legal_entity_id: number
    active: 0 | 1
}

export interface ResultAddStructurePluginType {
    api_key: string
    id: number
}

export interface BodyUpdateStructurePluginType {
    id: number
    services: StructurePluginTypeService[]
    active: 0 | 1
}


export interface ResponseStructurePluginTypes {
    rows: StructurePluginType[]
}