import React from 'react';
import { NavLink } from 'react-router-dom';
import cl from './Navbar.module.css';
import translate from './../../i18n/translate';

const Navbar = () => {
    return (<div className={cl.navbar}>
        <div className={cl.link}>
            <NavLink to='/' activeClassName={cl.activeLink}>{translate('aboutMe')}</NavLink>
        </div>
        <div className={cl.link}>
            <NavLink to='/todo' activeClassName={cl.activeLink}>{translate('todo')}</NavLink>
        </div>
    </div>
    )
};
export default Navbar;