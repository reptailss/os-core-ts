import React, {ReactNode, useEffect, useState} from 'react';
import Logo from "../../logo/Logo";
import './styles.css'
import ThemeSwitch from "./themeSwitch/ThemeSwitch";
import {setCookie} from "@helpers/cookie/cookie";
import {getInitialIsDarkTheme} from "@views/layouts/rootLayout/helpers/getInitialTheme";
import {getRootApiUrl} from "@helpers/apiUrl/getRootApiUrl";

interface Props {
    children: ReactNode
}

const RootLayout = ({children}: Props) => {

    const [isThemeDark, setIsThemeDark] = useState<boolean>(() => getInitialIsDarkTheme())

    const toggleTheme = () => {
        const newIsThemeDark = !isThemeDark
        const theme = newIsThemeDark ? 'dark' : 'light'
        setIsThemeDark(newIsThemeDark)
        setCookie('theme', theme)
        const body = document.body
        if (newIsThemeDark) {
            body.classList.add('darkTheme')
            return
        }
        body.classList.remove('darkTheme')
    }

    useEffect(() => {
        const isDark = getInitialIsDarkTheme()
        const body = document.body
        if (isDark) {
            body.classList.add('darkTheme')
            return
        }
        body.classList.remove('darkTheme')
    }, []);

    return (
        <div>
            <div
                className={'root-layout-header'}
            >
                <Logo/>

                <div
                    className={'root-layout-content-wrapper'}>
                    <a
                        href={`${getRootApiUrl()}dashboard`}
                        target={'_blank'}
                    >
                        Dashboard
                    </a>

                    <ThemeSwitch
                        onClick={toggleTheme}
                        isThemeDark={isThemeDark}
                    />
                </div>
            </div>

            {children}
        </div>
    );
};

export default RootLayout;
