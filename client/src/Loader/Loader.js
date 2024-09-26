import React from 'react';
import './Loader.css';

const BouncingLoader = () => {
    return (
        <div className="bouncing-loader">
            <div className="bounce-ball"></div>
            <div className="bounce-ball"></div>
            <div className="bounce-ball"></div>
        </div>
    );
};

export default BouncingLoader;

