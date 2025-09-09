import React, {useState} from 'react';
import Stack from "@mui/material/Stack";
import {getRandomString} from "@helpers/string/getRandomString";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {
    BankSyncParsingType,
    BankSyncParsingTypeFieldWithId
} from "@packages/bankSync/containers/bankParsingTypes/types";
import {OnSaveBankSyncParsingType} from "@packages/bankSync/containers/bankParsingTypes/types/events";
import MutateBankSyncTypeParsingField
    from "@packages/bankSync/containers/bankParsingTypes/mutateBankSyncType/MutateBankSyncTypeParsingField";


const getInitialFields = (initial?: BankSyncParsingType | null): BankSyncParsingTypeFieldWithId[] => {
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
    onSave: OnSaveBankSyncParsingType
    initial?: BankSyncParsingType | null
}

const MutateBankSyncParsingType = ({
                                onSave,
                                initial
                            }: Props) => {

    const [fields, setFields] = useState<BankSyncParsingTypeFieldWithId[]>(() => getInitialFields(initial))
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
                    key: '',
                    type: 'date',
                    id: getRandomString(),
                    name: ''
                }
            ]
        })
    }

    const list = fields?.length >= 1 && fields?.map((field, index) => {
        return (
            <MutateBankSyncTypeParsingField
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
                disabled={!!initial?.id}
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

export default MutateBankSyncParsingType;