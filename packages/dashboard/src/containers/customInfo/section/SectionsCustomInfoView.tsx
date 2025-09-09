import React from 'react';
import {SectionCustomInfo} from '../types';
import SectionCustomInfoView from "@containers/customInfo/section/SectionCustomInfoView";


interface Props {
    sections: SectionCustomInfo[]
}

const SectionsCustomInfoView = ({
                                    sections
                                }: Props) => {

    const list = sections?.map((section, index) => {
        return (
            <SectionCustomInfoView
                section={section}
                key={index}
            />
        )
    })
    return list;
};

export default SectionsCustomInfoView;
