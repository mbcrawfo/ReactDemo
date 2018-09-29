import '@bootstrap-css';

import React from 'react';

export interface INavBarNavProps
{
    readonly children: React.ReactNode;
}

const NavBarNav = ({ children }: INavBarNavProps) => (
    <ul className="nav navbar-nav">
        {children}
    </ul>
);

export { NavBarNav };
