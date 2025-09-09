import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import Spinner from '@ui/spinner/Spinner';
import NotFoundMessage from "@ui/notFoundMesssage/NotFoundMessage";
import Button from '@mui/material/Button';
import {useShowError} from "@hooks/useShowError";
import MutateBankSyncParsingTypeModal
    from "@packages/bankSync/containers/bankParsingTypes/mutateBankSyncType/MutateBankSyncParsingTypeModal";
import {
    OnDeleteBtnClickBankSyncParsingType,
    OnReadBtnClickBankSyncParsingType,
    OnSaveBankSyncParsingType
} from "@packages/bankSync/containers/bankParsingTypes/types/events";
import {BankSyncParsingType} from "@packages/bankSync/containers/bankParsingTypes/types";
import BankSyncTypesList from "@packages/bankSync/containers/bankParsingTypes/list/BankSyncTypesList";
import {useGetBankSyncTypes} from "@packages/bankSync/containers/bankParsingTypes/hooks/UseGetBankSyncTypes";
import {
    addBankSyncParsingTypes,
    deleteBankSyncParsingType,
    updateBankSyncParsingTypes
} from "@packages/bankSync/containers/bankParsingTypes/api/bankParsingTypes";

const BankSyncParsingTypes = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [targetBankSyncParsingType, setTargetBankSyncParsingType] = useState<BankSyncParsingType | null>(null)

    const {
        bankSyncParsingTypes,
        fetchTypes,
        isLoading
    } = useGetBankSyncTypes()

    const {onShowError} = useShowError()

    const onReadBtnClick: OnReadBtnClickBankSyncParsingType = async (bankSyncParsingType) => {
        setTargetBankSyncParsingType(bankSyncParsingType)
        setOpenModal(true)
    }
    const onDeleteBtnClick: OnDeleteBtnClickBankSyncParsingType = async (bankSyncParsingType) => {
        try {
            await deleteBankSyncParsingType({
                id: bankSyncParsingType.id
            })
            await fetchTypes()
        } catch (error) {
            onShowError(error)
        }
    }

    const onSave: OnSaveBankSyncParsingType = async (body) => {
        try {
            if ('id' in body) {
                await updateBankSyncParsingTypes(body)
            } else {
                await addBankSyncParsingTypes(body)
            }
            setOpenModal(false)

            await fetchTypes()
        } catch (error) {
            onShowError(error)
        }
    }

    const onAdd = () => {
        setTargetBankSyncParsingType(null)
        setOpenModal(true)
    }
    return (
        <Stack
            gap={1}
        >
            {isLoading && <Spinner variant={'overlay'}/>}

            <MutateBankSyncParsingTypeModal
                onSave={onSave}
                targetBankSyncParsingType={targetBankSyncParsingType}
                open={openModal}
                setOpen={setOpenModal}
            />

            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'flex-end'}
                gap={1}
            >
                <IconButton
                    onClick={fetchTypes}
                >
                    <RefreshIcon/>
                </IconButton>

                <Button
                    onClick={onAdd}
                    variant={'outlined'}
                >
                    Додати тип
                </Button>
            </Stack>

            {!bankSyncParsingTypes?.length && !isLoading && <NotFoundMessage/>}

            <BankSyncTypesList
                bankSyncParsingTypes={bankSyncParsingTypes}
                onReadBtnClick={onReadBtnClick}
                onDeleteBtnClick={onDeleteBtnClick}
            />
        </Stack>
    );
};

export default BankSyncParsingTypes;