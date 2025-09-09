import {ReactNode} from "react";

interface IProps {
    children: ReactNode
    value: number
    index: number
}

const TabPanel = ({children, value, index, ...other}: IProps) => {
    if (value !== index) {
        return
    }
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{
                height: '100%'
            }}
            {...other}
        >
            {children}
        </div>
    );
};
export default TabPanel