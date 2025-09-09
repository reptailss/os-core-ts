import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import AccessApp from "@packages/access/AccessApp";


const element = document.getElementById('root')

if (element) {

    const root = ReactDOM.createRoot(element)
    root.render(
        <BrowserRouter>
            <AccessApp/>
        </BrowserRouter>,
    )
}
