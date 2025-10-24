import React from 'react'
import ReactDOM from 'react-dom/client'
import AppClient from '@appClient/AppClient'
import {appDocsJson} from '@appDocs/index'

const element = document.getElementById('root')

if (element) {
    const root = ReactDOM.createRoot(element)
    
    root.render(
        <AppClient docsJson={appDocsJson} />,
    )
}
