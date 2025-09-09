import React, {useState} from 'react';
import {OnSaveImageGenerationType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types/events";
import {
    ImageGeneratorType,
    ImageGeneratorTypesFieldWithId
} from "@packages/imageGenerator/containers/imageGeneratorTypes/types";
import Stack from "@mui/material/Stack";
import MutateImageGeneratorTypeField
    from "@packages/imageGenerator/containers/imageGeneratorTypes/mutateImageGeneratorType/MutateImageGeneratorTypeField";
import {getRandomString} from "@helpers/string/getRandomString";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";


const getInitialFields = (initial?: ImageGeneratorType | null): ImageGeneratorTypesFieldWithId[] => {
    if (!initial?.fields) {
        return []
    }

    return initial.fields.map((field) => {
        return {
            ...field,
            id: getRandomString()
        }
    })
}

interface Props {
    onSave: OnSaveImageGenerationType
    initial?: ImageGeneratorType | null
}

const MutateImageGeneratorType = ({
                                      onSave,
                                      initial
                                  }: Props) => {

    const [fields, setFields] = useState<ImageGeneratorTypesFieldWithId[]>(() => getInitialFields(initial))
    const [key, setKey] = useState<string>(initial?.key || '');
    const [name, setName] = useState<string>(initial?.name || '');

    const handleSave = async () => {
        if (initial) {
            await onSave({
                id: initial.id,
                fields,
                key,
                name,
            })
            return
        }
        await onSave({
            fields,
            key,
            name,
        })
    }

    const onAddField = () => {
        setFields((prev) => {
            return [
                ...prev,
                {
                    type: 'text',
                    key: '',
                    id: getRandomString(),
                    required: 1,
                    name: ''
                }
            ]
        })
    }

    const list = fields?.length >= 1 && fields?.map((field, index) => {
        return (
            <MutateImageGeneratorTypeField
                field={field}
                key={field.id}
                setFields={setFields}
                index={index}
            />
        )
    })
    return (
        <Stack
            alignItems={'flex-start'}
            gap={3}

        >
            <TextField
                size={'small'}
                fullWidth
                value={key}
                onChange={(event) => setKey(event.target.value)}
                label={'Ключ типу'}
            />
            <TextField
                size={'small'}
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
                label={'Назва типу'}
            />
            <Button
                onClick={onAddField}
                variant={'outlined'}
            >
                Додати поле
            </Button>

            <Stack
                direction={{
                    xs: 'column',
                    lg: 'row'
                }}
                flexWrap={'wrap'}
                gap={2}
            >
                {list}
            </Stack>

            <Button
                onClick={handleSave}
                variant={'contained'}
            >
                Зберегти
            </Button>
        </Stack>
    );
};

export default MutateImageGeneratorType;