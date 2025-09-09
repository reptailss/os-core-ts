import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import MobAppSettingsApp from "@packages/mobAppSettings/MobAppSettingsApp";


const element = document.getElementById('root')

if (element) {

    const root = ReactDOM.createRoot(element)
    root.render(
        <BrowserRouter>
            <MobAppSettingsApp/>
        </BrowserRouter>,
    )
}
