import React from 'react'
import {NavigateItem} from '@layouts/navigation/types'
import {OnClickNavigate} from '@layouts/navigation/types/events'
import NavigationItemView from '@layouts/navigation/view/NavigationItemView'

const NavigationView = ({
                            navigations,
                            onClickNavigate,
                        }: {
    navigations: NavigateItem[]
    onClickNavigate: OnClickNavigate
}) => {
    return navigations.map((navigate) => {
        return (
            <NavigationItemView
                navigate={navigate}
                key={navigate.title}
                onClickNavigate={onClickNavigate}
                hasPadding={!navigate.children?.length}
                hasBorder={!navigate.children?.length}
            />
        )
    })
}

export default NavigationView