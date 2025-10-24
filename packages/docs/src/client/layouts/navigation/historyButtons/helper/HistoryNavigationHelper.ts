import {NavigateFunction} from 'react-router-dom'
import {ROUTE_PATHS} from '@routes/routePaths'

export class HistoryNavigationHelper {
    
    static handleScrollToElementByHash(hash: string) {
        const element = document.getElementById(hash)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            })
            this.addActiveElementNavigation(element)
            return
        }
        setTimeout(() => {
            const element = document.getElementById(hash)
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                })
                this.addActiveElementNavigation(element)
            }
        }, 300)
    }
    
    static getPathnameAndHashByHref = (href: string): {
        pathname: string,
        hash: string | null
    } => {
        const arr = href.split('#')
        const hash = arr.length >= 2 ? arr[arr.length - 1] : null
        const pathname = arr[0]
        return {
            hash,
            pathname,
        }
    }
    
    static handleAnchorClickUseHistoryNavigation({
                                                     event,
                                                     navigate,
                                                 }: {
        event: MouseEvent,
        navigate: NavigateFunction
    }) {
        const anchor = (event.target as HTMLElement).closest('a')
        if (!anchor) {
            return
        }
        const href = anchor.getAttribute('href')
        if (!href) {
            return
        }
        event.preventDefault()
        
        const blockId = anchor.getAttribute('data-block')
        if (!blockId) {
            return
        }
        const currentPathname = location.pathname
        
        const {hash, pathname} = this.getPathnameAndHashByHref(href)
        
        location.href = `${currentPathname}#${blockId}`
        
        setTimeout(() => {
            if (hash) {
                this.handleScrollToElementByHash(hash)
            }
            navigate({
                pathname: `${ROUTE_PATHS.docsList}/${pathname}`,
                hash: hash || '',
            })
        }, 100)
    }
    
    static handleScrollToElementByUrl() {
        setTimeout(() => {
            const url = location.href
            const {hash, pathname} = this.getPathnameAndHashByHref(url)
            if (!hash) {
                return
            }
            this.handleScrollToElementByHash(hash)
        }, 100)
    }
    
    static addActiveElementNavigation(element: HTMLElement | Element) {
        const oldElements = document.querySelectorAll('.active-text')
        if (oldElements.length) {
            oldElements.forEach((element) => {
                element.classList.remove('active-text')
            })
        }
        element.classList.add('active-text')
    }
    
    
}