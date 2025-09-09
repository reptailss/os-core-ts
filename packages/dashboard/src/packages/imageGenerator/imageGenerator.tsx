import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import ImageGeneratorApp from "@packages/imageGenerator/ImageGeneratorApp";


const element = document.getElementById('root');

if (element) {

    const root = ReactDOM.createRoot(element);
    root.render(
        <BrowserRouter>
            <ImageGeneratorApp/>
        </BrowserRouter>,
    );
}
