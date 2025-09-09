import React from 'react';
import './styles.css'

interface Prop {
    onClick: () => void,
    isThemeDark: boolean
}

const ThemeSwitch = ({onClick,isThemeDark}: Prop) => {
    return (
        <label
            className={'toggleThemeLabel'}
        >
            <input
                type="checkbox"
                className="toggleTheme"
                onClick={onClick}
                defaultChecked
            />


        </label>
    );
};

export default ThemeSwitch;
