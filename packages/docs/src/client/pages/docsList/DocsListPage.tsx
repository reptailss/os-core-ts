import React from 'react'
import HistoryButtons from '@layouts/navigation/historyButtons/HistoryButtons'
import {useMedia} from '@hooks/ui/useMedia'
import DocsList from '@docsList/DocsList'
import {useParams} from 'react-router-dom'

const DocsByPathPage = () => {
    
    const {isDesktop} = useMedia()
    
    const {key} = useParams()
 
    return (
        
        <>
            {isDesktop && <HistoryButtons />}
            
            <DocsList
                pagePath={key || ''}
            />
        </>
    )
}

export default DocsByPathPage
