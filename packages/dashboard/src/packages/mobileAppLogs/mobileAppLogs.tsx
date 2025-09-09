import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import MobileAppLogsApp from "@packages/mobileAppLogs/MobileAppLogsApp";


const element = document.getElementById('root')

if (element) {

    const root = ReactDOM.createRoot(element)
    root.render(
        <BrowserRouter>
            <MobileAppLogsApp/>
        </BrowserRouter>,
    )
}
