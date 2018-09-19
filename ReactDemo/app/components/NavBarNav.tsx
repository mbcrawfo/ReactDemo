import React, { ReactNode } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

type NavBarNavProps = {
    children: ReactNode
};

export const NavBarNav = ({ children }: NavBarNavProps) => (
    <ul className="nav navbar-nav">
        {children}
    </ul>
);

export default NavBarNav;