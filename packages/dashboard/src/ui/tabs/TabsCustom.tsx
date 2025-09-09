import {sx} from './sx'
import {Box, Tab, Tabs} from "@mui/material";

import React, {FC} from 'react'
import {SxStyle} from "@baseTypes/sx";
import {a11yProps} from "@ui/tabs/helpers";
import TabPanel from "@ui/tabs/TabPanel";
import {CustomTabItem} from "@ui/tabs/types";

interface ITabsProps {
    tabs: CustomTabItem[],
    sx?: SxStyle,
    initial?: number,
}

const TabsCustom: FC<ITabsProps> = ({
                                        tabs,
                                        sx: sxProps = {},
                                        initial
                                    }) => {

    const [value, setValue] = React.useState(initial || 0);

    const handleChange = (event: React.MouseEvent<HTMLButtonElement>, newValue: number) => {
        setValue(newValue);
    };


    const currentValue = (tabs?.length - 1 < value) ? tabs?.length - 1 : value;

    const tabsList = tabs?.map((item, i) => {
        const {label} = item;
        return (
            <Tab
                key={i}
                sx={sx.tabHeader}
                className={'tabsHeaderCustomItem'}
                label={label}
                {...a11yProps( i)}
            />
        )
    })

    const tabsPanelList = tabs?.map((item, i) => {
        const {component} = item;
        return (
            <TabPanel
                key={i}
                value={currentValue}
                index={i}
            >
                {component}
            </TabPanel>
        )
    })

    return (
        <Box
            sx={{
                ...sx.root,
                ...sxProps,
            } as SxStyle}
        >
            <Box sx={sx.inner}>
                <Tabs
                    className={'tabsHeaderCustom'}
                    sx={sx.header}
                    value={currentValue}
                    scrollButtons={false}
                    onChange={handleChange as any}
                >
                    {tabsList}
                </Tabs>
            </Box>

            <Box sx={sx.content}>
                {tabsPanelList}
            </Box>
        </Box>
    );
};
export default TabsCustom;