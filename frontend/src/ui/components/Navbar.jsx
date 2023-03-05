import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import nasaLogo from '../../assets/nasa-logo.svg';

export const Navbar = () => {
    const user = {};

    const onLogout = () => {
        console.log('Logout and navigate to home');
    };
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            <Link className="navbar-brand" to="/">
                <img src={nasaLogo} style={{ width: '50', height: '50' }} />
                NASA Wilfires
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink
                        className={({ isActive }) =>
                            `nav-item nav-link ${isActive ? 'active' : ''}`
                        }
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};
