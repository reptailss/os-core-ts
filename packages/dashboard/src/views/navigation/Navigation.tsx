import React from 'react'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import {sx} from './sx'
import {NavigateItem} from '@views/navigation/types'
import NavigationItem from '@views/navigation/NavigationItem'
import {useAppContext} from '@appContext/hooks/useAppContextContext'


interface Props {
    onClickNavigateItem?: (navigate: NavigateItem) => void
}

const Navigation = ({onClickNavigateItem}: Props) => {

    const {navigations} = useAppContext()

    return (
        <Stack sx={sx.root}>
            <List dense>
                {navigations?.map((item, index) => {
                    return (
                        <NavigationItem
                            item={item}
                            onClickNavigateItem={onClickNavigateItem}
                            key={index}
                        />
                    )
                })}
            </List>
        </Stack>
    )
}

export default Navigation
