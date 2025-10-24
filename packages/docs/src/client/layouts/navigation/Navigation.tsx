import React from 'react'
import {useGetNavigation} from '@layouts/navigation/hooks/useGetNavigation'
import NavigationView from '@layouts/navigation/view/NavigationView'
import {useLocation, useNavigate} from 'react-router-dom'
import {OnClickNavigate} from '@layouts/navigation/types/events'
import {ROUTE_PATHS} from '@routes/routePaths'

const Navigation = ({onClickNavigate}: {
    onClickNavigate?: () => void
}) => {
    
    const navigations = useGetNavigation()
    const {pathname} = useLocation()
    const navigate = useNavigate()
    
    const handleClickNavigate: OnClickNavigate = (navigateItem) => {
        if (!navigateItem.anchor) {
            navigate({
                pathname:  `${ROUTE_PATHS.docsList}/${navigateItem.path}`,
            })
            onClickNavigate && onClickNavigate()
            return
        }
        const activePath = pathname === navigateItem.path
        if (activePath) {
            const element = document.getElementById(navigateItem.anchor)
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                })
            }
            navigate({
                pathname: `${ROUTE_PATHS.docsList}/${navigateItem.path }`,
                hash: navigateItem?.anchor,
            })
            onClickNavigate && onClickNavigate()
            return
        }
        navigate({
            pathname: `${ROUTE_PATHS.docsList}/${navigateItem.path}` ,
            hash: navigateItem?.anchor,
        })
        setTimeout(() => {
            const element = document.getElementById(navigateItem.anchor || '')
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                })
            }
        }, 100)
        onClickNavigate && onClickNavigate()
        
    }
    
    return (
        <NavigationView
            navigations={navigations}
            onClickNavigate={handleClickNavigate}
        />
    )
}

export default Navigation
