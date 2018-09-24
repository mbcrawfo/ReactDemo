import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export type NavBarNavProps = {
    children: React.ReactNode
};

export const NavBarNav = ({ children }: NavBarNavProps) => (
    <ul className="nav navbar-nav">
        {children}
    </ul>
);

export default NavBarNav;