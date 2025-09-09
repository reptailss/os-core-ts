import {ImageGeneratorTemplateFieldType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types";

export const IMAGE_GENERATOR_TEMPLATE_FIELD_TYPES: {
    value: ImageGeneratorTemplateFieldType,
    label: string
}[] = [
    {
        value: 'qr_code',
        label: 'qr code'
    },
    {
        value: 'bar_code',
        label: 'bar code'
    },
    {
        value: 'image',
        label: 'image'
    },
    {
        value: 'text',
        label: 'text'
    },
]