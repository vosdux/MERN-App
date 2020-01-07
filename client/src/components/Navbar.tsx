import React, { FC, useContext, MouseEvent } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar: FC = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <span className="brand-logo">Соркращение ссылок</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/links">Ссылки</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>

    )
}
