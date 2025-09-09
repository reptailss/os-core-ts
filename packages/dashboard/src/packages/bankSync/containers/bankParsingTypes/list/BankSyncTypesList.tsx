import React from 'react';
import Grid2 from '@mui/material/Grid2';
import BankSyncTypesItem from "@packages/bankSync/containers/bankParsingTypes/list/BankSyncTypesItem";
import {BankSyncParsingType} from "@packages/bankSync/containers/bankParsingTypes/types";
import {
    OnDeleteBtnClickBankSyncParsingType,
    OnReadBtnClickBankSyncParsingType
} from "@packages/bankSync/containers/bankParsingTypes/types/events";

interface Props {
    bankSyncParsingTypes: BankSyncParsingType[]
    onReadBtnClick: OnReadBtnClickBankSyncParsingType
    onDeleteBtnClick: OnDeleteBtnClickBankSyncParsingType
}

const BankSyncTypesList = ({
                               bankSyncParsingTypes,
                               onReadBtnClick,
                               onDeleteBtnClick,
                           }: Props) => {

    const list = bankSyncParsingTypes?.length >= 1 && bankSyncParsingTypes?.map((bankSyncParsingType) => {
        return (
            <BankSyncTypesItem
                bankSyncParsingType={bankSyncParsingType}
                onReadBtnClick={onReadBtnClick}
                onDeleteBtnClick={onDeleteBtnClick}
            />
        )
    })
    return (
        <Grid2
            container
            spacing={2}
        >
            {list}
        </Grid2>
    );
};

export default BankSyncTypesList;