import React from 'react';
import {ImageGeneratorTemplateFieldType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types";
import Stack from "@mui/material/Stack";
import {SetStateFn} from "@baseTypes/state";
import {IconButton, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import {BankSyncParsingTypeFieldWithId} from "@packages/bankSync/containers/bankParsingTypes/types";
import SelectBankSyncParsingFieldTypes
    from "@packages/bankSync/containers/bankParsingTypes/select/SelectBankSyncParsingFieldTypes";

interface Props {
    setFields: SetStateFn<BankSyncParsingTypeFieldWithId[]>
    field: BankSyncParsingTypeFieldWithId
    index: number
}

const MutateBankSyncTypeParsingField = ({
                                     setFields,
                                     field,
                                     index,
                                 }: Props) => {

    const handleChange = (
        value: ImageGeneratorTemplateFieldType | 0 | 1 | string,
        key: 'type' | 'key' | 'name'
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
                    with: '100%'
                }}
            >
                <Stack
                    direction={'row'}
                    justifyContent={'flex-end'}
                    sx={{
                        with: '100%'
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

                <SelectBankSyncParsingFieldTypes
                    value={field.type}
                    onChange={(value) => handleChange(value, 'type')}
                />

            </Stack>
        </Paper>
    );
};

export default MutateBankSyncTypeParsingField;