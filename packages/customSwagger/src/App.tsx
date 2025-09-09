import React from 'react'
import SwaggerCustom from './swaggerCustom/SwaggerCustom'
import './app.css'
import RootLayout from "./views/layouts/rootLayout/RootLayout";

const App = () => {
    return (
        <RootLayout>
            <SwaggerCustom/>
        </RootLayout>
    )
}

export default App
