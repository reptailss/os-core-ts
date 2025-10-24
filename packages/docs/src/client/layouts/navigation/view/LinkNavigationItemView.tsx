import React from 'react'
import {Typography} from '@mui/material'
import {useLocation} from 'react-router-dom'
import sx from './sx'
import {NavigateItem} from '@layouts/navigation/types'
import {OnClickNavigate} from '@layouts/navigation/types/events'

const LinkNavigationItemView = ({
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
    
    const {pathname, hash} = useLocation()
    
    const activePath = pathname === navigate.path
    const active = navigate.anchor ? hash === `#${navigate.anchor}` && activePath : activePath
    
    const onNavigate = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        onClickNavigate(navigate)
        
    }
    return (
        <Typography
            sx={sx.link}
            component={'a'}
            onClick={onNavigate}
            className={
                `${active ? 'active-link' : ''}
             ${navigate?.anchor ? 'anchor-link' : ''}
             ${hasPadding ? 'has-padding' : ''}
             ${hasBorder ? 'has-border' : ''}`
            }
        >
            {navigate.title}
        </Typography>
    )
}

export default LinkNavigationItemView
