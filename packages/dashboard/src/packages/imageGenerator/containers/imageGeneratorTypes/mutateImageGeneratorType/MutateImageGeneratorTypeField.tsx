import React from 'react';
import {
    ImageGeneratorTemplateFieldType,
    ImageGeneratorTypesFieldWithId
} from "@packages/imageGenerator/containers/imageGeneratorTypes/types";
import Stack from "@mui/material/Stack";
import {SetStateFn} from "@baseTypes/state";
import SwitchCustom from "@ui/switch/SwitchCustom";
import SelectImageGeneratorTemplateFieldTypes
    from "@packages/imageGenerator/containers/imageGeneratorTypes/select/SelectImageGeneratorTemplateFieldTypes";
import {IconButton, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    setFields: SetStateFn<ImageGeneratorTypesFieldWithId[]>
    field: ImageGeneratorTypesFieldWithId
    index: number
}

const MutateImageGeneratorTypeField = ({
                                           setFields,
                                           field,
                                           index,
                                       }: Props) => {

    const handleChange = (
        value: ImageGeneratorTemplateFieldType | 0 | 1 | string,
        key: 'required' | 'type' | 'key' | 'name'
    ) => {
        setFields((prev) => {
            return prev.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        [key]: value
                    }
                }
                return item
            })
        })
    }

    const onDelete = () => {
        setFields((prev) => {
            return prev?.filter((item) => item?.id?.toString() !== field.id?.toString())
        })
    }
    return (
        <Paper
            elevation={4}
            sx={{
                width: {
                    xs: '100%',
                    lg: '260px',
                },
                padding: '20px'
            }}
        >
            <Stack
                gap={2}
                sx={{
                    with:'100%'
                }}
            >
                <Stack
                    direction={'row'}
                    justifyContent={'flex-end'}
                    sx={{
                        with:'100%'
                    }}
                >
                    <IconButton
                        onClick={onDelete}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </Stack>

                <TextField
                    size={'small'}
                    fullWidth
                    value={field.key}
                    onChange={(event) => handleChange(event.target.value, 'key')}
                    label={'Ключ поля'}
                />

                <TextField
                    size={'small'}
                    fullWidth
                    value={field.name}
                    onChange={(event) => handleChange(event.target.value, 'name')}
                    label={'Назва поля'}
                />

                <SelectImageGeneratorTemplateFieldTypes
                    value={field.type}
                    onChange={(value) => handleChange(value, 'type')}
                />
                <SwitchCustom
                    value={Boolean(field.required)}
                    onChange={(checked) => handleChange(checked ? 1 : 0, 'required')}
                    label={'Обовязкове поле'}
                />

            </Stack>
        </Paper>
    );
};

export default MutateImageGeneratorTypeField;