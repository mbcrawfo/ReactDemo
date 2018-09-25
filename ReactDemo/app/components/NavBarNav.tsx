import React from 'react';
import '@bootstrap-css';

export interface INavBarNavProps
{
    readonly children: React.ReactNode;
}

export const NavBarNav = ({ children }: INavBarNavProps) => (
    <ul className="nav navbar-nav">
        {children}
    </ul>
);

export default NavBarNav;
