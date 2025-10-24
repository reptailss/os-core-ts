import {useLocation, useNavigate} from 'react-router-dom'
import {ROUTE_PATHS} from '@routes/routePaths'

export function useNavigateFromSearch(): {
    onNavigate: (path: string) => void
} {
    const {pathname} = useLocation()
    
    const navigate = useNavigate()
    
    const onNavigate = (path: string) => {
        if (!path.includes('#')) {
            navigate(`${ROUTE_PATHS.docsList}/${path}`)
            return
        }
        const [currentPath, currentHash] = path.split('#')
        const activePath = pathname === currentPath
        if (activePath) {
            const element = document.getElementById(currentHash)
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                })
            }
            navigate({
                pathname: `${ROUTE_PATHS.docsList}/${currentPath}`,
                hash: currentHash,
            })
            return
        }
        navigate({
            pathname: `${ROUTE_PATHS.docsList}/${currentPath}`,
            hash: currentHash,
        })
        setTimeout(() => {
            const element = document.getElementById(currentHash || '')
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                })
            }
        }, 100)
    }
    
    return {
        onNavigate,
    }
}