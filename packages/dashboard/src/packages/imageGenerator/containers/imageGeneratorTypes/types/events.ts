import {
    BodyAddImageGeneratorTemplateSetting,
    BodyUpdateImageGeneratorTemplateSetting,
    ImageGeneratorType
} from "@packages/imageGenerator/containers/imageGeneratorTypes/types/index";

export type OnReadBtnClickImageGenerationType = (imageGeneratorType: ImageGeneratorType) => Promise<void>
export type OnDeleteBtnClickImageGenerationType = (imageGeneratorType: ImageGeneratorType) => Promise<void>
export type OnSaveImageGenerationType = (
    body: BodyAddImageGeneratorTemplateSetting | BodyUpdateImageGeneratorTemplateSetting
) => Promise<void>