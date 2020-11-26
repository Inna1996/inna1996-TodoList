import React from 'react';
import spinner from '../../assets/images/spinner.svg';
import cl from './Preloader.module.css';

let Preloader = () => {
    return (
        <div className={cl.spinner}>
            <img src={spinner}></img>
        </div>
    )
}

export default Preloader;