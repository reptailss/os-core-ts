import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {HistoryNavigationHelper} from '@layouts/navigation/historyButtons/helper/HistoryNavigationHelper'


export function useHistoryNavigation() {
    
    const navigate = useNavigate()
    
    const goBack = () => {
        window.history.back()
    }
    const goForward = () => {
        window.history.forward()
    }
    useEffect(() => {
        const handleAnchorClick = (event: MouseEvent) => {
            HistoryNavigationHelper.handleAnchorClickUseHistoryNavigation({
                event,
                navigate,
            })
        }
        const onPopstate = () => {
            HistoryNavigationHelper.handleScrollToElementByUrl()
        }
        window.addEventListener('popstate', onPopstate)
        document.addEventListener('click', handleAnchorClick)
        return () => {
            window.removeEventListener('popstate', onPopstate)
            document.removeEventListener('click', handleAnchorClick)
        }
    }, [])
    
    return {
        goBack,
        goForward,
    }
}


