import React from 'react';

const Spinner = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className={'loader'}></div>
        </div>
    );
};

export default Spinner;
