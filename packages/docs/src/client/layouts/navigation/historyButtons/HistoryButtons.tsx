import React from 'react'
import HistoryButtonsView from '@layouts/navigation/historyButtons/view/HistoryButtonsView'
import {useHistoryNavigation} from '@layouts/navigation/historyButtons/hooks/useHistoryNavigation'

function HistoryButtons() {
    
    const {
        goBack,
        goForward,
    } = useHistoryNavigation()
    
    return (
        <HistoryButtonsView
            goBack={goBack}
            goForward={goForward}
        />
    )
}

export default HistoryButtons
