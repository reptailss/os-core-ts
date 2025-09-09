import React from 'react';
import SelectCustom from "@ui/select/selectCustom/SelectCustom";
import {
    IMAGE_GENERATOR_TEMPLATE_FIELD_TYPES
} from "@packages/imageGenerator/containers/imageGeneratorTypes/select/constants";
import {ImageGeneratorTemplateFieldType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types";

interface Props {
    value: ImageGeneratorTemplateFieldType,
    onChange: (value: ImageGeneratorTemplateFieldType) => void
}

const SelectImageGeneratorTemplateFieldTypes = ({
                                                    value,
                                                    onChange
                                                }: Props) => {
    return (
        <SelectCustom
            data={IMAGE_GENERATOR_TEMPLATE_FIELD_TYPES}
            value={value}
            onChange={onChange as any}
            label={'Тип поля'}
        />
    );
};

export default SelectImageGeneratorTemplateFieldTypes;