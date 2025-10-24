import React from 'react'
import Accordion from '@mui/material/Accordion'
import {AccordionDetails, AccordionSummary, Stack} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import sx from './sx'
import {NavigateItem} from '@layouts/navigation/types'
import {OnClickNavigate} from '@layouts/navigation/types/events'
import LinkNavigationItemView from '@layouts/navigation/view/LinkNavigationItemView'

const NavigationItemView = ({
                                navigate,
                                onClickNavigate,
                                hasPadding,
                                hasBorder
                            }: {
                                navigate: NavigateItem
                                onClickNavigate: OnClickNavigate
                                hasPadding?: boolean
                                hasBorder?: boolean
                            }
) => {
    
    if (!navigate?.children?.length) {
        return (
            <LinkNavigationItemView
                navigate={navigate}
                onClickNavigate={onClickNavigate}
                hasPadding={hasPadding}
                hasBorder={hasBorder}
            />
        )
    }
    
    return (
        <Accordion
            defaultExpanded={navigate.initialOpen}
            sx={sx.root}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={sx.summary}
            >
                {navigate.path ? <LinkNavigationItemView
                    navigate={navigate}
                    onClickNavigate={onClickNavigate}
                /> : navigate.title}
            </AccordionSummary>
            
            <AccordionDetails
                sx={sx.content}
            >
                <Stack
                    sx={sx.children}
                >
                    {navigate.children?.map((navigate) => {
                        return (
                            <NavigationItemView
                                navigate={navigate}
                                onClickNavigate={onClickNavigate}
                                key={navigate.title}
                            />
                        )
                    })}
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default NavigationItemView
