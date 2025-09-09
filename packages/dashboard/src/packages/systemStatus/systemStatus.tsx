import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import SystemStatusApp from '@packages/systemStatus/SystemStatusApp'


const element = document.getElementById('root')

if (element) {

    const root = ReactDOM.createRoot(element)
    root.render(
        <BrowserRouter>
            <SystemStatusApp />
        </BrowserRouter>,
    )
}
