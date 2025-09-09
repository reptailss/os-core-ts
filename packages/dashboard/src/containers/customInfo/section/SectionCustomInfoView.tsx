import React from 'react';
import {SectionCustomInfo} from "@containers/customInfo/types";
import Divider from '@mui/material/Divider';
import BlockCustomInfoView from "@containers/customInfo/section/BlockCustomInfoView";
import Typography from '@mui/material/Typography';


interface Props {
    section: SectionCustomInfo
}

const SectionCustomInfoView = ({
                                   section
                               }: Props) => {

    return (
        <>
            {section?.label && <Typography>
                {section.label}
            </Typography>}

            {section?.blocks?.map((block, index) => {
                return (
                    <BlockCustomInfoView
                        key={index}
                        block={block}
                    />
                )
            })}
        </>
    );
};

export default SectionCustomInfoView;
