export type ImageGeneratorType = {
    key: string
    name: string
    fields: ImageGeneratorTypesField[]
    id: number
    date_add: string
    date_update: string
}


export type ImageGeneratorTypesField = {
    type: ImageGeneratorTemplateFieldType
    required: 0 | 1
    key:string
    name:string
}

export type ImageGeneratorTypesFieldWithId = ImageGeneratorTypesField & {
    id:string
}

export type ImageGeneratorTemplateFieldType = 'bar_code' | 'image' | 'qr_code' | 'text'

export interface BodyAddImageGeneratorTemplateSetting {
    name: string
    key: string
    fields: ImageGeneratorTypesField[]
}

export interface BodyUpdateImageGeneratorTemplateSetting extends BodyAddImageGeneratorTemplateSetting {
    id: number
}


export interface ResponseImageGeneratorTypes{
    rows:ImageGeneratorType[]
}