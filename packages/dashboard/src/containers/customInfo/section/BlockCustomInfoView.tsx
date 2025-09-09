import React from 'react';
import {BlockCustomInfo} from "@containers/customInfo/types";
import CardCustom from "@ui/card/CardCustom";
import Divider from '@mui/material/Divider';
import JsonViewerCustom from "@ui/jsonViewer/JsonViewerCustom";
import Grid2 from '@mui/material/Grid2';

interface Props {
    block: BlockCustomInfo,
}

const BlockCustomInfoView = ({
                                 block,
                             }: Props) => {


    switch (block.type) {
        case "cards": {
            return (
                <Grid2
                    container
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 4,
                    }}
                >
                    {block?.cards?.map((card, index) => {
                        return (
                            <CardCustom
                                {...card}
                                key={index}
                            />
                        )
                    })}
                </Grid2>
            )
        }
        case "divider": {
            return <Divider>{block.label}</Divider>
        }

        case "json": {
            return <JsonViewerCustom data={block.json} name={block.label}/>
        }
    }

};

export default BlockCustomInfoView;
