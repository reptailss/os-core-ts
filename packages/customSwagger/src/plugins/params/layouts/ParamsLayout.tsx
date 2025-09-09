import React, {ReactNode} from 'react';

interface Props {
    children: ReactNode,
    header: ReactNode
}

const ParamsLayout = ({children, header}: Props) => {
    return (
        <div className="opblock-section">
            <div className="opblock-section-header">
                {header}
            </div>
            {children}
        </div>
    );
};

export default ParamsLayout;
