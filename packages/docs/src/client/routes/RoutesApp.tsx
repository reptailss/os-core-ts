import React from 'react'

import {Route, Routes} from 'react-router-dom'
import {ROUTE_PATHS} from '@routes/routePaths'
import HomePage from '@pages/home/HomePage'
import DocsListPage from '@pages/docsList/DocsListPage'

const RoutesApp = () => {
    
    return (
        <Routes>
            <Route element={<DocsListPage />} path={ROUTE_PATHS.docsListWithKey} />
            <Route element={<HomePage />} path={ROUTE_PATHS.home} />
        </Routes>
    
    )
}

export default RoutesApp
