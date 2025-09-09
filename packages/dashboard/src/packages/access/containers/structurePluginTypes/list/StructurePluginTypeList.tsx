import React from 'react';
import Grid2 from '@mui/material/Grid2';
import BankSyncTypesItem from "@packages/bankSync/containers/bankParsingTypes/list/BankSyncTypesItem";
import {BankSyncParsingType} from "@packages/bankSync/containers/bankParsingTypes/types";
import {
    OnDeleteBtnClickBankSyncParsingType,
    OnReadBtnClickBankSyncParsingType
} from "@packages/bankSync/containers/bankParsingTypes/types/events";
import StructurePluginTypeItem from "@packages/access/containers/structurePluginTypes/list/StructurePluginTypeItem";
import {StructurePluginType} from "@packages/access/containers/structurePluginTypes/types";
import {
    OnDeleteBtnClickStructurePluginType,
    OnReadBtnClickStructurePluginType
} from "@packages/access/containers/structurePluginTypes/types/events";

interface Props {
    structurePluginTypes: StructurePluginType[]
    onReadBtnClick: OnReadBtnClickStructurePluginType
    onDeleteBtnClick: OnDeleteBtnClickStructurePluginType
}

const StructurePluginTypeList = ({
                                     structurePluginTypes,
                               onReadBtnClick,
                               onDeleteBtnClick,
                           }: Props) => {

    const list = structurePluginTypes?.length >= 1 && structurePluginTypes?.map((structurePluginType) => {
        return (
            <StructurePluginTypeItem
                structurePluginType={structurePluginType}
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

export default StructurePluginTypeList;